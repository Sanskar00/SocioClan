import createTypography from '@material-ui/core/styles/createTypography';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LikeCommentHover from '../likeCommentHover/likeCommentHover';
import { useState } from 'react';
import { firestore } from '../../firebase/firebase';
import { selectCurrentUser } from '../../redux/user/user-selector';
import { selectModalStatus } from '../../redux/profilePost/profile-selctor';


const LikeCount=({currentUser,uuid,like})=>{
    const [likeCount,setlikeCount]=useState(0)
    const [userLike,setUserLike]=useState(like)
    const getUserLike = async () => {
        const likesDoc = firestore.collection('likes').doc(uuid)
        const likesSnapshot = await likesDoc.get()
        if (likesSnapshot.exists) {
            setlikeCount(likesSnapshot.data().userLikes.length)
        }
    }
    useEffect(() => {
        getUserLike()
    }, [like])
    
    return(
        
        (likeCount)?(likeCount==1)?<span >{likeCount}<span style={{marginLeft:'3px'}}>like</span></span>:<span >{likeCount}<span style={{marginLeft:'3px'}}>likes</span></span>:null

            
     
    )
}
const mapStateToProps=({user,profilePost})=>({
    currentUser:user.currentUser,
    like:profilePost.like
})
export default connect(mapStateToProps)(LikeCount)