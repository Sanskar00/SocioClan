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
import { ChatBubbleOutlined, GridOff } from '@material-ui/icons';
import CommentDisplay from '../commentDisplay/commentDisplay'
import { Link } from 'react-router-dom';
import LikeDisplay from '../likeDisplay/likeDisplay';
import LikeCountDisplay from '../likeCountDisplay/likeCountDisplay';
import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { DeleteSharp } from '@material-ui/icons';
import { firestore } from '../../firebase/firebase';
import firebase from 'firebase';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '75%',
        marginLeft: '12.5%',
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            margin: '0'
        }
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
        // justifyContent: 'space-between'
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
    commentsField: {
        margin: theme.spacing(1)
    },
    descriptionGrid: {
        display: 'flex',
        margin:'10px 15px',
    }
}));

const HomePost = ({ currentUser, userPosts }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }
    const classes = useStyles()
    const { displayName, avatar, image, uuid, uid, description } = userPosts
    const deletePost=async()=>{
        const postDoc=firestore.collection('posts').doc(uid);
        const postSnapshot=await postDoc.get();
        const userPostArray=postSnapshot.data().userPost
        const likesDoc=firestore.collection('likes').doc(uuid)
        const commentsDoc=firestore.collection('comments').doc(uuid)
       
        if(postSnapshot.exists){
            userPostArray.map(post=>{
                if(post.uuid==uuid){
                    likesDoc.delete()
                    commentsDoc.delete()
                    postDoc.update({
                        userPost:firebase.firestore.FieldValue.arrayRemove(post)
                      }).then(setTimeout(() => { window.location.reload();}, 500))
                }
            })
        }


    }

    
    return (
        <Card className={classes.root} elevation={2} >
            <CardHeader
                avatar={
                    <Avatar src={avatar} />
                }
                action={
                    (currentUser.uid==uid)?
                    <IconButton aria-label="settings">
                        <DeleteSharp onClick={deletePost}/>
                    </IconButton>:null
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
            {(!description)?null:<Grid className={classes.descriptionGrid}>
                <Avatar src={avatar} className={classes.small} />
                <Typography variant="subtitle2" display='inline ' style={{marginTop:'2px'}}>
                    <b>{displayName}</b> {description}
                </Typography>
            </Grid>}

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