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
import postDetailsModal from '../postDetailsModal/postDetailsModal';


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
export default function ProfilePosts({ profilePosts }) {
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
    return (
        <div >

            <div className='postItem' >
              {
                profilePosts.map(post=>(
                  <div >
                    <img src={post.image} className='image' onClick={handleOpen} ></img>
                    <LikeCommentHover post={post} className='likeComments' ></LikeCommentHover>
                    <postDetailsModal open={open}></postDetailsModal>
                  </div>
                  
                ))
              }
            </div>

  
        </div>
    );
}