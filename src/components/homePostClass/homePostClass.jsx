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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selector';
import { useState } from 'react';
import { Box, InputAdornment } from '@material-ui/core';
import CommentBox from '../commentBox/commentBox';
import { ChatBubbleOutlined } from '@material-ui/icons';
import CommentDisplay from '../commentDisplay/commentDisplay'
import { Link } from 'react-router-dom';
import LikeDisplay from '../likeDisplay/likeDisplay';
import LikeCountDisplay from '../likeCountDisplay/likeCountDisplay';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '5px'
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
        marginLeft: "30px",
        width: '20px',
        display: 'flex',
        justifyContent: 'space-between'
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
    favouriteRed: {
        color: 'red'
    },
    spanLike: {
        marginLeft: '3px'
    },
    commentsField:{
        margin:theme.spacing(1)
    }
}));

const HomePost = ({ currentUser, userPosts }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }
    const classes=useStyles()

    const { displayName, avatar, image, uuid, uid } = userPosts
    return (
        <Card className={classes.root} elevation={2} >
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
            />{image ?
                (<CardMedia
                    className={classes.media}
                    image={image}
                />) : (<Skeleton animation="wave" className={classes.media} />)}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <LikeDisplay uuid={uuid}></LikeDisplay>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ChatBubbleOutlined />
                </IconButton>
            </CardActions>
            <Box className={classes.likeNo}>
                <LikeCountDisplay uuid={uuid} ></LikeCountDisplay>
            </Box>

            <CardContent>
                <CommentBox uuid={uuid} className={classes.commentsField}></CommentBox>

            </CardContent>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CommentDisplay key={uuid} uuid={uuid}></CommentDisplay>

            </Collapse>
        </Card>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(HomePost)