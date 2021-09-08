import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import RecipeReviewCard from '../homePost/homePost';
import HomePost from '../homePostClass/homePostClass';
import './homeContainer.scss'

export default function SimpleContainer({posts}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className='container'>
          {
              posts.map(post=>(
                // <HomePosts userPosts={post}></HomePosts>
                <HomePost userPosts={post} key={post.uuid}></HomePost>
              ))
          }
        
      </Container>
    </React.Fragment>
  );
}