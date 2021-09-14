import createTypography from '@material-ui/core/styles/createTypography';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { firestore } from '../../firebase/firebase';
import { setLikeModalStatus } from '../../redux/profilePost/profilePost.action';
import { setPostUuid } from '../../redux/profilePost/profilePost.action';



const LikeCount=(props)=>{
    const {currentUser,uuid,like,setLikeModalStatus,setPostUuid}=props
    const [likeCount,setlikeCount]=useState(0)
    const getUserLike = async () => {
        const likesDoc = firestore.collection('likes').doc(uuid)
        const likesSnapshot = await likesDoc.get()
        if (likesSnapshot.exists) {
            setlikeCount(likesSnapshot.data().userLikes.length)
        }
    }
    const modalHandler=()=>{
        setLikeModalStatus(true)
        setPostUuid(uuid);
    }
    useEffect(() => {
        getUserLike()
    }, [like])
    
    return(
        <div>
            {(likeCount)?(likeCount==1)?<span onClick={modalHandler} style={{cursor:'pointer'}} >{likeCount}<span style={{marginLeft:'3px',}}>like</span></span>
        :<span onClick={modalHandler} style={{cursor:'pointer'}} >{likeCount}<span style={{marginLeft:'3px'}}>likes</span></span>:null}
        </div>
        

            
     
    )
}
const mapStateToProps=({user,profilePost})=>({
    currentUser:user.currentUser,
    like:profilePost.like
})
const mapdispatchToProps=dispatch=>({
    setLikeModalStatus:like=>dispatch(setLikeModalStatus(like)),
    setPostUuid:uuid=>dispatch(setPostUuid(uuid))
    
})
export default connect(mapStateToProps,mapdispatchToProps)(LikeCount)