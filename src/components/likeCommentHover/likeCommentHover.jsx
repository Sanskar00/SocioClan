import { FavoriteOutlined } from '@material-ui/icons';
import React from 'react'
import { Component } from 'react';
import { ChatBubbleOutlined } from '@material-ui/icons';
import { firestore } from '../../firebase/firebase';

class LikeCommentHover extends Component{
    constructor({post}){
        super({post});
        this.state={
            postUuid:post.uuid,
            postLikeCount:0,
            postCommentCount:0
        }
    }
    componentDidMount(){
        const getPostLikeCount=async ()=>{
            const likesDoc = firestore.collection('likes').doc(this.state.postUuid)
            const likesSnapshot = await likesDoc.get()
            if(likesSnapshot.exists){
                this.setState({ postLikeCount: likesSnapshot.data().userLikes.length })
            }
        }
        getPostLikeCount()
        const getPostCommentCount=async ()=>{
            const commentDoc=firestore.collection('comments').doc(this.state.postUuid)
            const commentSnapShot=await commentDoc.get()
            if(commentSnapShot.exists){
                this.setState({postCommentCount:commentSnapShot.data().userComments.length})
            }
        }
        getPostCommentCount()
        
        
    }
    render(){
        return(
            <div>
                <span>{this.state.postLikeCount}<FavoriteOutlined/></span>
                <span>{this.state.postCommentCount}<ChatBubbleOutlined/></span>
            </div>
        )
    }
}
export default LikeCommentHover