import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selector';
import { useState } from 'react';
import { firestore } from '../../firebase/firebase';
import firebase from 'firebase';
import { useEffect } from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { ContactPhoneOutlined, FavoriteSharp } from '@material-ui/icons';
import { InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CommentBox from '../commentBox/commentBox';
import { ChatBubbleOutlined } from '@material-ui/icons';
import CommentDisplay from '../commentDisplay/commentDisplay'
import { Link } from 'react-router-dom';
import LikeDisplay from '../likeDisplay/likeDisplay';
import LikeCountDisplay from '../likeCountDisplay/likeCountDisplay';

const useStyles = (theme) => ({
    root: {
        width: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        // transition: theme.transitions.create('transform', {
        //     duration: theme.transitions.duration.shortest,
        // }),
    },
    // expandOpen: {
    //     transform: 'rotate(180deg)',
    // },
    avatar: {
        backgroundColor: red[500],
    },
    favouriteLikes: {
        color: 'red'
    },
    likeNo: {
        marginLeft: "30px"
    },
    small: {
        width: '25px',
        height: '25px',
    },
    comments: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',

    },
    favouriteRed:{
        color:'red'
    }
});

class HomePostsClass extends Component {
    constructor(props) {
        super(props);
        const{currentUser}=this.props
        this.state = {
            favourite: true,
            expanded: false,
            postLikes: 0,
            postComments: [],
            userLike:false,
            user:currentUser
        }
    }
    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded })
    }
   
   
    
    render() {
        const { classes, userPosts } = this.props
        const like=this.state.userLike

        const { displayName, avatar, image,uuid,uid } = userPosts
        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar src={avatar} />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={<Link to={`/${uid}`}>{displayName}</Link>}
                />
                <CardMedia
                    // style={{
                    //     height: 0,
                    //     paddingTop: '56.25%'
                    // }}
                    className={classes.media}
                    image={image}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                       <LikeDisplay uuid={uuid}></LikeDisplay>
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="show more"
                    >
                        <ChatBubbleOutlined/>
                    </IconButton>
                </CardActions>
                <LikeCountDisplay uuid={uuid} className={classes.likeNo}></LikeCountDisplay>
                <CardContent>
                <CommentBox uuid={uuid}></CommentBox>

                </CardContent>
                
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CommentDisplay uuid={uuid}></CommentDisplay>

                </Collapse>
            </Card>
        )
    }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(withStyles(useStyles, { withTheme: true })(HomePostsClass))