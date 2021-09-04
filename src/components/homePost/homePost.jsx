import React from 'react';
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
import Favorite from '@material-ui/icons/Favorite';
import LikeDisplay from '../likeDisplay/likeDisplay';
import LikeCount from '../likeCountDisplay/likeCountDisplay'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    favouriteLikes: {
        color: 'red'
    }
}));

const HomePosts = (props) => {
    const { userPosts, currentUser } = props
    const { displayName, avatar, image, uuid } = userPosts
    const classes = useStyles();
    const [user, setUser] = useState(currentUser)
    const [favourite, setFavourite] = useState(false)
    const [expanded, setExpanded] = React.useState(false);
    const [userLike, setUserLike] = useState(false)
    const [likeCount, setlikeCount] = useState(0)
    let [postLikeArray, setPostLikeArray] = useState()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const { currentUser } = props
        const getUserLike = async () => {
            const likesDoc = firestore.collection('likes').doc(uuid)
            const likesSnapshot = await likesDoc.get()
            if (likesSnapshot.exists) {
                setlikeCount(likesSnapshot.data().userLikes.length)

            }
        }
        getUserLike()
    }, [favourite])
    useEffect(() => {
        const getUserLikeArrays = async () => {
            const likesDoc = firestore.collection('likes').doc(uuid)
            const likesSnapshot = await likesDoc.get()
            if (likesSnapshot.exists) {
                const userLikesArray = likesSnapshot.data().userLikes
                setPostLikeArray(postLikeArray => (userLikesArray))

            }
        }
        getUserLikeArrays()
    }, [postLikeArray])
    // useEffect(()=>{
    //     const setUserLike=async ()=>{


    //         const likesDoc = firestore.collection('likes').doc(uuid)
    //         const likesSnapshot = await likesDoc.get()
    //         if(likesSnapshot.exists){
    //             const userLikesArray = likesSnapshot.data().userLikes
    //             userLikesArray.map(k=>{
    //                try{ 
    //                 if(k.userUid==user.uid){
    //                     setFavourite(true) 
    //                 }
    //                 else{
    //                     setFavourite(false)
    //                 }}catch{
    //                     console.log("couldn't red a like icon")
    //                 }
    //             })
    //         }

    //     }
    //     setUserLike()

    // },[currentUser])
    useEffect(() => {
        console.log(likeCount)
        console.log(favourite)
        console.log(postLikeArray)

    }, [favourite])




    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={avatar}>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={displayName}
                subheader="September 14, 2016"
            />
            <CardMedia
                className={classes.media}
                image={image}
                title="Paella dish"
            />
            <CardContent>
                
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
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
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <LikeCount uuid={uuid}></LikeCount>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(HomePosts)

