import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import RecipeReviewCard from '../homePost/homePost';
import HomePostsClass from '../homePostClass/homePostClass';

export default function SimpleContainer({posts}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
          {
              posts.map(post=>(
                // <HomePosts userPosts={post}></HomePosts>
                <HomePostsClass userPosts={post}></HomePostsClass>
              ))
          }
        
      </Container>
    </React.Fragment>
  );
}