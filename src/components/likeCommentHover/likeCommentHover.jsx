import { FavoriteOutlined } from '@material-ui/icons';
import React from 'react'
import { Component } from 'react';
import { ChatBubbleOutlined } from '@material-ui/icons';
import { firestore } from '../../firebase/firebase';
import LikeCountDisplay from '../likeCountDisplay/likeCountDisplay';
import './likeCommentsHover.scss'

class LikeCommentHover extends Component {
    constructor(props) {
        super(props);
        const { post } = this.props
        this.state = {
            postUuid: post.uuid,
            postLikeCount: 0,
            postCommentCount: 0
        }
    }
    componentDidMount() {
        const getPostLikeCount = async () => {

            const likesDoc = firestore.collection('likes').doc(this.state.postUuid)
            const likesSnapshot = await likesDoc.get()
            if (likesSnapshot.exists) {
                this.setState({ postLikeCount: likesSnapshot.data().userLikes.length })
            }

        }
        getPostLikeCount()
        const getPostCommentCount = async () => {
            const commentDoc = firestore.collection('comments').doc(this.state.postUuid)
            const commentSnapShot = await commentDoc.get()
            if (commentSnapShot.exists) {
                this.setState({ postCommentCount: commentSnapShot.data().userComments.length })
            }
        }
        getPostCommentCount()


    }
    render() {
        return (
            <div className='likeComments'>
                <div className='like'>
                    <FavoriteOutlined />
                    <LikeCountDisplay uuid={this.state.postUuid}></LikeCountDisplay>
                </div>

                <ChatBubbleOutlined />
                <span>{this.state.postCommentCount}</span>
            </div>
        )
    }
}
export default LikeCommentHover