import React from 'react';
import { Component } from 'react';
import ProfilePostContainer from '../../components/profilePostContainer/profilePostContainer';
import { firestore } from '../../firebase/firebase';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        const {match}=this.props
        this.state = {
            id: match.params.id,
            profilePosts: [],
        }
    }
    componentDidMount() {
        const getUserPOst = async () => {
            const userPosts = firestore.collection('posts').doc(this.state.id)
            const userPostsSnapshot = await userPosts.get()
            const userPostsSnapshotArray=userPostsSnapshot.data().userPost
            userPostsSnapshotArray.map(p=>{
                this.setState({profilePosts:[...this.state.profilePosts,p]})
            })
        }
        getUserPOst()

    }
    render() {
        return (
            <div>
                {
                   <ProfilePostContainer uid={this.state.id} profilePosts={this.state.profilePosts}/>
                   
                }
            </div>
        )
    }
}
export default ProfilePage;