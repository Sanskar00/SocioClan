import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Favorite, TurnedInTwoTone } from '@material-ui/icons';
import { useState } from 'react';
import { firestore } from '../../firebase/firebase';
import firebase from 'firebase';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selector';
import { connect } from 'react-redux';
import { setLikeStatus } from '../../redux/profilePost/profilePost.action';


const useStyles = makeStyles((theme) => ({
    favouriteRoot:{
    },
    favouriteLikes:{
      color:'red',
      cursor:'pointer'
      
    }
  }));
const LikeDisplay=({currentUser,uuid,setLikeStatus})=>{
    const classes=useStyles()
    const [favourite, setFavourite] = useState(false)
    const [user,setUser]=useState(null)
    
    let [postLikeArray,setPostLikeArray]=useState()
    const handleFavourite = async (event) => {
        const { avatar, displayName } = currentUser
        
        
        const likesDoc = firestore.collection('likes').doc(uuid)
        const likesSnapshot = await likesDoc.get()
        try{if (!likesSnapshot.exists) {
          likesDoc.set({
            userLikes: [{
                userUid:currentUser.uid
            }]
          }).then(()=>(setFavourite(true),setLikeStatus(true)))
        }
        else {
          likesDoc.update({
            userLikes: firebase.firestore.FieldValue.arrayUnion({
                userUid:currentUser.uid
            })
          }).then(()=>(setFavourite(true),setLikeStatus(true)))}
        }catch(err){
          console.log("can't set like to db")
        }
        if(favourite==true){
           const userLikesArray=likesSnapshot.data().userLikes
          if(likesSnapshot.exists){
            userLikesArray.map(k=>{
              if(k.userUid==currentUser.uid){
                likesDoc.update({
                  userLikes:firebase.firestore.FieldValue.arrayRemove(k)
                }).then(()=>(setFavourite(false),setLikeStatus(false)))
              }
            })
          }
        }}
        const setUserLike=async ()=>{
          
       
          const likesDoc = firestore.collection('likes').doc(uuid)
          const likesSnapshot = await likesDoc.get()
          if(likesSnapshot.exists){
              const userLikesArray = likesSnapshot.data().userLikes
              userLikesArray.map(k=>{
                //  try{ 
                //   if(this.state.user){if(k.userUid==currentUser.uid){
                //     setFavourite({userLike:true})   
                //   }
                //   else{
                //       setFavourite({userLike:false})
                //   }}}catch{
                //       console.log("couldn't red a like icon")
                //   }
                if(currentUser){
                  if(k.userUid==currentUser.uid){
                        setFavourite(true)
                      }
                      else if(k.userUid!==currentUser.uid){
                          setFavourite(false)
                      }
                }
              })
          }

      }
        useEffect(()=>{
         setUserLike()
        },[currentUser])
    return(
        <div className={classes.favouriteRoot}>
            {currentUser?<Favorite onClick={handleFavourite} className={favourite?classes.favouriteLikes:null}></Favorite>:null}
        </div>
    )


}
const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
})
const mapdispatchToProps=dispatch=>({
  setLikeStatus:like=>dispatch(setLikeStatus(like))
})
export default connect(mapStateToProps,mapdispatchToProps)(LikeDisplay);