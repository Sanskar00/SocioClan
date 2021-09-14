import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { setLikeModalStatus } from '../../redux/profilePost/profilePost.action';
import { useEffect } from 'react';
import { firestore } from '../../firebase/firebase';
import { Avatar } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { maxWidth } from '@material-ui/system';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '5px',
        maxWidth: 300
    },
    userLikeDisplay: {
        display: 'flex'
    },
    avatar: {
        width: '30px',
        height: '30px'
    }
}));

const LikeModal = ({ likeModalStatus, setLikeModalStatus, postUuid }) => {
    const classes = useStyles();
    const [userData, setUserData] = useState([])
    const getUserLike = async () => {
        if (postUuid) {
            const likesRef = firestore.collection('likes').doc(postUuid)
            const likesSnapshot = await likesRef.get()
            if (likesSnapshot.exists) {
                const userLikesArray = likesSnapshot.data().userLikes
                let data = []
                userLikesArray.map(k => {
                    const getUser = async () => {

                        const userRef = firestore.collection('users').doc(k.userUid)
                        const userSnapshot = await userRef.get()
                        const user = userSnapshot.data()
                        data = [...data, user]
                        setUserData(data)


                    }
                    getUser()
                })
            }
        }

    }
    const handleClose = () => {
        setLikeModalStatus(false)
    }
    useEffect(() => {
        getUserLike()
        console.log(userData)
    }, [likeModalStatus])
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={likeModalStatus}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={likeModalStatus}>
                    <div className={classes.paper}>{
                        userData.map(k => (
                            <div className={classes.userLikeDisplay} >
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            className={classes.avatar}
                                            alt="Remy Sharp"
                                            src={k.avatar}
                                        />
                                    }
                                    title={<Link to={`/${k.uid}`} onClick={handleClose}>{k.userName}</Link>}
                                />
                                {/* <p id="transition-modal-description">react-transition-group animates me.</p>       */}
                            </div>

                        ))
                    }
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
const mapStateToProps = ({ profilePost }) => ({
    likeModalStatus: profilePost.likeModalStatus,
    postUuid: profilePost.postUuid

})
const mapdispatchToProps = dispatch => ({
    setLikeModalStatus: like => dispatch(setLikeModalStatus(like))
})
export default connect(mapStateToProps, mapdispatchToProps)(LikeModal)