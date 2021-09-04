import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { CardMedia, Grid, Paper } from '@material-ui/core';
import profileDetails from '../profileDetails/profileDetails';
import LikeCommentHover from '../likeCommentHover/likeCommentHover';
import PostImage from '../posrImage/postImage';
import './profilePost.scss'
import { useState } from 'react';
import PostDetailsModal from '../postDetailsModal/postDetailsModal';
import { setModalStatus } from '../../redux/profilePost/profilePost.action';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectModalStatus } from '../../redux/profilePost/profile-selctor';


/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const ProfilePosts=({ profilePosts,modalStatus,setModalStatus})=> {
  const [open,setOpen]=useState(false)
  const [postImage,setPostImage]=useState(null)
  // const handleOpen=(event)=>{
  //   setOpen(true)
  //   setModalStatus(open)
  //   console.log(open)
  //   console.log(modalStatus)
  //   setPostImage(event.target.src)
  //   console.log(postImage)

  // }
    return (
        <div >

            <div className='postItem' >
              {
                profilePosts.map(post=>(
                  <div key={post.uuid}>
                    {/* <img src={post.image} className='image' onClick={handleOpen} alt={post.uuid}></img> */}
                    <PostImage post={post}></PostImage>
                    <LikeCommentHover post={post}></LikeCommentHover>
                   

                   
                  </div>
                  
                ))
              }
            </div>

  
        </div>
    );
}
const mapdispatchToProps=dispatch=>({
  setModalStatus:(modalStatus) => dispatch(setModalStatus(modalStatus))
})
const mapStateToProps=state=>({
  modalStatus:selectModalStatus
})
export default connect(mapStateToProps,mapdispatchToProps)(ProfilePosts)
