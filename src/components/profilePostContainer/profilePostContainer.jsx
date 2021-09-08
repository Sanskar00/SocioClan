import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ProfilePosts from '../profilePost/profilePost';
import ProfileDetails from '../profileDetails/profileDetails';
import PostDetailsModal from '../postDetailsModal/postDetailsModal';
import './profilePostContainer.scss'
import { useEffect } from 'react';
import { useState } from 'react';
import SmallScreenModal from '../smallScreenModal/smallScreenModal';


const ProfilePostContainer = ({ profilePosts, uid }) => {
    const [matches,setMatches]=useState(
        window.matchMedia("(max-width:800px)").matches
    )
    useEffect(()=>{
        const handler=e=>setMatches(e.matches);
        window.matchMedia("(max-width:800px)").addListener(handler)
    })
    return(<React.Fragment>
        <CssBaseline />
        
        <Container className='container'>
            <ProfileDetails uid={uid} profilePosts={profilePosts}></ProfileDetails>
            <ProfilePosts profilePosts={profilePosts} ></ProfilePosts>
            {!matches&&<PostDetailsModal uid={uid}></PostDetailsModal>}
            {matches&&<SmallScreenModal></SmallScreenModal>}

        </Container>
    </React.Fragment>)
}
export default ProfilePostContainer