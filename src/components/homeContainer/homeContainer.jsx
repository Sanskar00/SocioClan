import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import RecipeReviewCard from '../homePost/homePost';

export default function SimpleContainer({posts}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container width="50%">
          {
              posts.map(post=>(
                  <RecipeReviewCard userPost={post}></RecipeReviewCard>

              ))
          }
        
      </Container>
    </React.Fragment>
  );
}