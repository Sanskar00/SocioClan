import React from 'react';
import { setModalStatus,setPostImage,setPostUuid } from '../../redux/profilePost/profilePost.action';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectModalStatus } from '../../redux/profilePost/profile-selctor';
import './postImage.scss'

const PostImage=(props)=>{
    const {post,setModalStatus,modalStatus,setPostImage,setPostUuid}=props
    // const [postImage,setPostImage]=useState(null)
    const handleOpen=(event)=>{
        setModalStatus(true)
        setPostImage(event.target.src)
        setPostUuid(event.target.alt)
        console.log(modalStatus)
    
      }
return(<div>
    <img src={post.image} alt={post.uuid} className='postImage' onClick={handleOpen}></img>
    
    
</div> 
)
}
const mapStateToProps=state=>({
    modalStatus:selectModalStatus
})
const mapdispatchToProps=dispatch=>({
    setModalStatus:(modalStatus) => dispatch(setModalStatus(modalStatus)),
    setPostImage:(postImage)=>dispatch(setPostImage(postImage)),
    setPostUuid:uuid=>dispatch(setPostUuid(uuid))
  })

export default connect(mapStateToProps,mapdispatchToProps)(PostImage);
