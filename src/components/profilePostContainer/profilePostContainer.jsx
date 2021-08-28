import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ProfilePosts from '../profilePost/profilePost';
import ProfileDetails from '../profileDetails/profileDetails';


const ProfilePostContainer = ({ profilePosts, uid }) => (
    <React.Fragment>
        <CssBaseline />
        <Container style={{ width: "50%", paddingLeft: '100px' }}>
            <ProfileDetails uid={uid} profilePosts={profilePosts}></ProfileDetails>
            <ProfilePosts profilePosts={profilePosts}></ProfilePosts>
        </Container>
    </React.Fragment>
)
export default ProfilePostContainer