//libararies
import React from 'react';

//styles
import './uploadToDatabase.scss'
import { Button, Grid, InputAdornment, Modal } from '@material-ui/core';
import { Backdrop } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';




//firebase
import firebase from 'firebase';
import { firestore } from '../../firebase/firebase';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selector';
import { connect } from 'react-redux';
import { setModalStatus, setUploadStatus } from '../../redux/profilePost/profilePost.action';
import { useState } from 'react';
import { height } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    paper: {
        backgroundColor: 'white',
        border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        width: '35%',
        height: '35%',
        borderRadius:'2px'

        // padding: theme.spacing(2, 4, 3),
    },
    postImage: {
        height: '200px',
        width: '200px',
        margin: '3px'
    },
    form: {
        marginLeft: '15%'
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        marginLeft:'20%',
        marginTop:'5%'

    },
  description:{
      padding:'5px',
  }

}))

const UploadToDatabase = (props) => {
    const { filename, image, currentUser, setUploadStatus, uploadStatus } = props
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
        setUploadStatus(false)

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
            }).then(setTimeout(() => { window.location.reload(); }, 1000))
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
            }).then(setTimeout(() => { window.location.reload(); }, 200))


        }
    }
    const classes = useStyles()
    console.log(uploadStatus)
    const closeModal = () => (
        setUploadStatus(false)
    )
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={uploadStatus}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={uploadStatus}>
                    <div className={classes.paper}>
                        <div className={classes.imgDis}>
                            <TextField
                                id="outlined-secondary"
                                placeholder='Add post description'
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                className={classes.description}
                                rows={10}
                                multiline
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <img className={classes.postImage} src={image}></img>
                                        </InputAdornment>
                
                                    )
                                }}
                            />
                        </div>

                        <form onSubmit={onsubmit} className={classes.form} >
                            <div className={classes.buttons}>
                                <Button variant='contained' color='primary' type='submit'>Upload</Button>
                                <Button variant='contained' onClick={closeModal} >Cancel</Button>
                            </div>


                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

const mapStateToProps = ({ user, profilePost }) => ({
    currentUser: user.currentUser,
    uploadStatus: profilePost.uploadStatus
})
const mapdispatchToProps = dispatch => ({
    setUploadStatus: uplaod => dispatch(setUploadStatus(uplaod))

})
export default connect(mapStateToProps, mapdispatchToProps)(UploadToDatabase)
{/* <div className='uploadPopUp'>
            <div className='imageDiv'>
                <img className='postImage' src={image}></img>
            </div>

            <div className='formUploader'>
               
            </div>


        </div> */}