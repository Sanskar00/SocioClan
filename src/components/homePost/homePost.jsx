// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { selectCurrentUser } from '../../redux/user/user-selector';
// import { useState } from 'react';
// import { firestore } from '../../firebase/firebase';
// import firebase from 'firebase';
// import { useEffect } from 'react';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%'
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
//   favouriteLikes:{
//     color:'red'
//   }
// }));

// const HomePosts = (props) => {
//   const { userPosts, currentUser } = props
//   const { displayName, avatar, image, uuid } = userPosts
//   const classes = useStyles();
//   const [favourite, setFavourite] = useState(false)
//   const [expanded, setExpanded] = React.useState(false);
//   consr [userLike,setUserLike]=useState()

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
//   const handleFavourite = async (event) => {
//     console.log(uuid)
//     const { avatar, displayName } = currentUser
    
    
//     const likesDoc = firestore.collection('likes').doc(uuid)
//     const likesSnapshot = await likesDoc.get()
//     try{if (!likesSnapshot.exists) {
//       likesDoc.set({
//         userLikes: {
//           displayName: currentUser.displayName,
//           avatar: currentUser.avatar
//         }
//       }).then(()=>(setFavourite(true)))
//     }
//     else {
//       likesDoc.update({
//         userLikes: firebase.firestore.FieldValue.arrayUnion({
//           displayName: currentUser.displayName,
//           avatar: currentUser.avatar
//         })
//       }).then(()=>(setFavourite(true)))}
//     }catch(err){
//       console.log("can't set like to db")
//     }
//     if(favourite==true){
//       const userLikesArray=likesSnapshot.data().userLikes
//       if(likesSnapshot.exists){
//         userLikesArray.map(k=>{
//           if(k.displayName==currentUser.displayName){
//             likesDoc.update({
//               userLikes:firebase.firestore.FieldValue.arrayRemove(k)
//             }).then(()=>setFavourite(false))
//           }
//         })
//       }
//     }}
//   console.log(favourite)
  


//   return (
//     <Card className={classes.root}>
//       <CardHeader
//         avatar={
//           <Avatar aria-label="recipe" className={classes.avatar} src={avatar}>
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={displayName}
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         className={classes.media}
//         image={image}
//         title="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" color="textSecondary" component="p">
//           This impressive paella is a perfect party dish and a fun meal to cook together with your
//           guests. Add 1 cup of frozen peas along with the mussels, if you like.
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon onClick={handleFavourite}/>
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <IconButton
//           className={clsx(classes.expand, {
//             [classes.expandOpen]: expanded,
//           })}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </IconButton>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph>Method:</Typography>
//           <Typography paragraph>
//             Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
//             minutes.
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// })
// export default connect(mapStateToProps)(HomePosts)

