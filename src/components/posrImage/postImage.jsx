import React from 'react';
import LikeCommentHover from '../likeCommentHover/likeCommentHover';

const PostImage=({post})=>{
return(<div>
    
    <LikeCommentHover post={post}></LikeCommentHover>
</div> 
)
}
   

export default PostImage;