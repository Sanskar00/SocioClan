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
import { setUploadStatus } from '../../redux/profilePost/profilePost.action';
import { useState } from 'react';
const useStyles = ((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        display: 'flex',
        padding: theme.spacing(2, 4, 3),
    },
}))

const UploadToDatabase = (props) => {
    const { filename, image, currentUser, setUploadStatus } = props
    const { displayName, avatar, uid } = currentUser
    const [open, setOpen] = useState(false);
    function create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    console.log(create_UUID())


    const createdAt = new Date();

    const onsubmit = async (e) => {
        e.preventDefault()
        setUploadStatus(true)

        const userPosts = firestore.collection('posts').doc(uid)
        const userPostSnapshot = await userPosts.get()
        if (!userPostSnapshot.exists) {
            userPosts.set({
                userPost: [{
                    displayName: displayName,
                    image: image,
                    filename: filename,
                    uuid: create_UUID(),
                    uid: uid,
                    createdAt: createdAt

                }]
            }).then()
        }

        else {
            userPosts.update({
                userPost: firebase.firestore.FieldValue.arrayUnion({
                    displayName: displayName,
                    image: image,
                    filename: filename,
                    uuid: create_UUID(),
                    uid: uid,
                    createdAt: createdAt
                })
            }).then(setTimeout(() => { window.location.reload(); }, 100))


        }
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


        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
const mapdispatchToProps = dispatch => ({
    setUploadStatus: uplaod => dispatch(setUploadStatus(uplaod))
})
export default connect(mapStateToProps, mapdispatchToProps)(UploadToDatabase)
