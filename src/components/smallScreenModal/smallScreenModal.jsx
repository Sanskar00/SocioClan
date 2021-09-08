import React from 'react';
import { Avatar, Box, CardMedia, IconButton, Modal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { setModalStatus, } from '../../redux/profilePost/profilePost.action';
import { selectModalStatus, } from '../../redux/profilePost/profile-selctor';
// import { selectPostUuid } from '../../redux/profilePost/profile-selctor';
// import { selectPostImage } from '../../redux/profilePost/profile-selctor';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core';
import LikeDisplay from '../likeDisplay/likeDisplay';
import { firestore } from '../../firebase/firebase';
import profileDetails from '../profileDetails/profileDetails';
import CommentDisplay from '../commentDisplay/commentDisplay';
import CommentBox from '../commentBox/commentBox';
import { ChatBubbleOutlined, ChatOutlined } from '@material-ui/icons';
import LikeCountDisplay from '../likeCountDisplay/likeCountDisplay';
import HomePostClass from '../homePostClass/homePostClass';

const useStyles = ((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width:'100%'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    display: 'flex'
    // padding: theme.spacing(2, 4, 3),
  },
  media: {
    height: 'auto',
    width:'800px',
    paddingTop: '56.25%', // 16:9
    [theme.breakpoints.down('sm')]:{
      height: 'auto',
      width:'auto'
    }
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  rootDetails: {
    // postion:'absolute',

    width: '100%',
    height: '100%',
    flexDirection: 'coloumn'
  },
  profileDetails: {

    display: 'flex',
    margin: '10px',
    borderBottom: '1px inset black',
    padding: '5px'
  },
  displayName: {
    margin: '5px',

  },
  commentBox: {
    borderTop: '1px outset black',
    padding: '5px'
  },
  likeCommentDetails: {
    position: 'absolute',
    bottom: '0'
  },
  likeCount:{
    marginLeft:'30px',
  },

}));
class SmallScreenModal extends Component {
  constructor() {
    super();
    this.state = {
      profileDetails: null,
    }
  }
  handleClose = () => {
    const { setModalStatus } = this.props
    setModalStatus(false)

  }
  componentDidMount() {
    const { uid } = this.props
    const getProfileDetails = async () => {
      const userSnapShot = await firestore.collection('users').doc(uid).get()
      this.setState({ profileDetails: userSnapShot.data() })
    }
    getProfileDetails()
  }
  render() {
    const { image, modalStatus, classes, postImage, uuid, uid } = this.props
    const { profileDetails } = this.state
    const userPosts={
        image:postImage,
        uid:uid,
        uuid:uuid
    }
    return (
      <div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalStatus}
          onClose={this.handleClose}
          closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
        >
          <Fade in={modalStatus}>
            <div className={classes.paper} >
                <HomePostClass userPosts={userPosts}></HomePostClass>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }
}
const mapdispatchToProps = dispatch => ({
  setModalStatus: modalStatus => dispatch(setModalStatus(modalStatus))
})
const mapStateToProps = ({ profilePost, }) => ({
  modalStatus: profilePost.modalStatus,
  postImage: profilePost.postImage,
  uuid: profilePost.postUuid
})

export default connect(mapStateToProps, mapdispatchToProps)(withStyles(useStyles, { withTheme: true })(SmallScreenModal))