//libararies
import React from 'react';

//styles
import './uploadToDatabase.scss'

//firebase
import firebase from 'firebase';
import { firestore } from '../../firebase/firebase';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selector';
import { connect } from 'react-redux';
const UploadToDatabase = (props) => {
    const { filename, image, currentUser } = props
    const { displayName, avatar, uid } = currentUser
    console.log(filename)
    console.log(image)

    function create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    console.log(create_UUID())


    const onsubmit = async (e) => {
        e.preventDefault()
        const userPosts = firestore.collection('posts').doc(uid)
        const userPostSnapshot = await userPosts.get()
        if (!userPostSnapshot.exists) {
            userPosts.set({
                userPost: [{
                    displayName: displayName,
                    avatar: avatar,
                    image: image,
                    filename: filename,
                    like:0

                }]
            })
        }
        userPosts.update({
            userPost: firebase.firestore.FieldValue.arrayUnion({
                displayName: displayName,
                avatar: avatar,
                image: image,
                filename: filename,
                like:0
            })
        })


    }
    return (

        <div className='uploadPopUp'>
            <div className='imageDiv'>
                <img className='postImage' src={image}></img>
            </div>

            <div className='formUploader'>
                <form onSubmit={onsubmit}>
                    <button className='button'>Upload</button>
                    <button className='button'>Cancel</button>
                </form>
            </div>


        </div>)

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(UploadToDatabase)
