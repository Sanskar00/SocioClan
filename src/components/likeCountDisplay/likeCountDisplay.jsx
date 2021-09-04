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


const LikeCount=({currentUser,uuid,})=>{
    const [likeCount,setlikeCount]=useState(0)
    const getUserLike = async () => {
        const likesDoc = firestore.collection('likes').doc(uuid)
        const likesSnapshot = await likesDoc.get()
        if (likesSnapshot.exists) {
            setlikeCount(likesSnapshot.data().userLikes.length)
        }
    }
    useEffect(() => {
        getUserLike()
    }, [likeCount])
    return(
        (likeCount)?<span style={{margin:'30px'}}>{likeCount} Like</span>:null
            
     
    )
}
const mapStateToProps=createStructuredSelector({
    currentUser:selectCurrentUser,
})
export default connect(mapStateToProps)(LikeCount)