import { Grid, Paper, withStyles } from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { classes } from 'istanbul-lib-coverage';
import React from 'react';
import { Component } from 'react';
import { firestore } from '../../firebase/firebase';
import './profileDetails.scss'
import { ReactComponent as ProfilePicture } from '/home/sanskar/SocioClan/SocioClan/src/user-profile.svg'

const useStyles = ((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    userName:{
        height:'25%'
    },
    postDetails:{
        paddingTop:'5px'
    },
    displayName:{
        paddingTop:'1px',
        
    }
}));

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        const {uid}=this.props
        this.state = {
            userUid: uid,
            profileDetails: {},
        }
    }
    componentDidMount() {
        const {profilePosts}=this.props
        const getProfileDetails = async () => {
            const userSnapShot = await firestore.collection('users').doc(this.state.userUid).get()
            this.setState({ profileDetails: userSnapShot.data() })
            const postsSnapshot=await firestore.collection('posts').doc(this.state.userUid).get()
            this.setState({postCount:postsSnapshot.data().userPost.length})

        }
        getProfileDetails()
        


    }

    render() {
        const { classes } = this.props
        return (
            <div className='profileContainer'>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        {this.state.profileDetails.avatar ?
                            <img className='image' style={{ borderRadius: '50%' }} src={this.state.profileDetails.avatar} />
                            : <ProfilePicture className='image' />}

                    </Grid>
                    <Grid item xs={6}>
                        <Grid item xs={6} className={classes.userName}>
                            <h1 className='userName'>{this.state.profileDetails.userName}</h1>
                        </Grid>
                        <Grid item xs={6} className={classes.postDetails} >
                            <h3>{this.state.postCount} Posts</h3>
                        </Grid>
                        <Grid item xs={6} className={classes.displayName} >
                            <h3 className='displayName'>{this.state.profileDetails.displayName}</h3>
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        )
    }

}
export default withStyles(useStyles, { withTheme: true })(ProfileDetails)