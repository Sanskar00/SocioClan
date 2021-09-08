import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import ProfilePostContainer from '../../components/profilePostContainer/profilePostContainer';
import { firestore } from '../../firebase/firebase';

const ProfilePage = ({ match, uploadStatus }) => {
    // constructor(props) {
    //     super(props);
    //     const {match}=this.props
    //     this.state = {
    //         id: match.params.id,
    //         profilePosts: [],
    //     }
    // }
    const [id, setId] = useState(match.params.id)
    const [profilePosts, setProfilePosts] = useState([])
    const [count,setCount]=useState(0)

    // componentDidMount() {
    //     const getUserPOst = async () => {
    //         const userPosts = firestore.collection('posts').doc(this.state.id)
    //         const userPostsSnapshot = await userPosts.get()
    //         if(userPostsSnapshot.exists){
    //         const userPostsSnapshotArray=userPostsSnapshot.data().userPost
    //         userPostsSnapshotArray.map(p=>{
    //             this.setState({profilePosts:[...this.state.profilePosts,p].sort((a,b)=>b.createdAt-a.createdAt)})
    //         })}
    //     }
    //     getUserPOst()

    // }
    const getUserPost = async () => {
        const userPosts = firestore.collection('posts').doc(id)
        const userPostsSnapshot = await userPosts.get()
        if (userPostsSnapshot.exists) {
            const userPostsSnapshotArray = userPostsSnapshot.data().userPost
            setProfilePosts(userPostsSnapshotArray.sort((a, b) => b.createdAt - a.createdAt))
            setCount(userPostsSnapshotArray.length)
        }
    }
    useEffect(() => {
        getUserPost();
        console.log(count)
    }, [uploadStatus])

    return (
        <div>
            {
                <ProfilePostContainer uid={id} profilePosts={profilePosts} />

            }
        </div>
    )
}
const mapStateToProps = ({ profilePost }) => ({
    uploadStatus: profilePost.uploadStatus
})
export default connect(mapStateToProps)(ProfilePage);
// const getUserPOst = async () => {
//     const userPosts = firestore.collection('posts').doc(this.state.id)
//     const userPostsSnapshot = await userPosts.get()
//     if(userPostsSnapshot.exists){
//     const userPostsSnapshotArray=userPostsSnapshot.data().userPost
//     userPostsSnapshotArray.map(p=>{
//         this.setState({profilePosts:[...this.state.profilePosts,p].sort((a,b)=>b.createdAt-a.createdAt)})
//     })}
// }