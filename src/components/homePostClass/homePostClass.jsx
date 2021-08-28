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
    constructor({currentUser}) {
        super({currentUser});
        this.state = {
            favourite: false,
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
    handleFavourite = async (event) => {

        const { currentUser, userPosts } = this.props
        const { uuid, image } = userPosts
        const { avatar, displayName } = currentUser


        const likesDoc = firestore.collection('likes').doc(uuid)
        const likesSnapshot = await likesDoc.get()
        try {
            if (!likesSnapshot.exists) {
                likesDoc.set({
                    userLikes: [{
                        displayName: currentUser.displayName,
                        avatar: currentUser.avatar
                    }]
                }).then(() => (this.setState({ favourite: true })))
            }
            else {
                likesDoc.update({
                    userLikes: firebase.firestore.FieldValue.arrayUnion({
                        displayName: currentUser.displayName,
                        avatar: currentUser.avatar
                    })
                }).then(() => (this.setState({ favourite: true })))
            }
        } catch (err) {
            console.log("can't set like to db")
        }
        if (this.state.favourite == true) {
            const userLikesArray = likesSnapshot.data().userLikes
            if (likesSnapshot.exists) {
                userLikesArray.map(k => {
                    if (k.displayName == currentUser.displayName) {
                        likesDoc.update({
                            userLikes: firebase.firestore.FieldValue.arrayRemove(k)
                        }).then(() => {this.setState({ favourite: false })})
                    }
                })
            }
        }
    }
    componentDidMount() {
        const { userPosts } = this.props
        const { uuid } = userPosts
        const getUserLike = async () => {
            const likesDoc = firestore.collection('likes').doc(uuid)
            const likesSnapshot = await likesDoc.get()
            if(likesSnapshot.exists){
                this.setState({ postLikes: likesSnapshot.data().userLikes.length })
            }
        }
        getUserLike()
    
        const setUserLike=async ()=>{
          
       
            const likesDoc = firestore.collection('likes').doc(uuid)
            const likesSnapshot = await likesDoc.get()
            if(likesSnapshot.exists){
                const userLikesArray = likesSnapshot.data().userLikes
                userLikesArray.map(k=>{
                   try{ 
                    if(k.displayName==this.state.user.displayName){
                      this.setState({userLike:true})
                    }
                    else{
                        this.setState({userLike:false})
                    }}catch{
                        console.log("couldn't red a like icon")
                    }
                })
            }

        }
        setUserLike()
        

    }
    
    render() {
        const { classes, userPosts } = this.props


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
                    title="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteSharp onClick={this.handleFavourite} className={this.state.userLike?classes.favouriteRed:null} />
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
                <span className={classes.likeNo}>{this.state.postLikes}</span>
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