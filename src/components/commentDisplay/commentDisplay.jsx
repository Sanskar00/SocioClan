import { CardContent } from '@material-ui/core'
import React from 'react'
import { Component } from 'react';
import { firestore } from '../../firebase/firebase'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { setModalStatus } from '../../redux/profilePost/profilePost.action';
import { connect } from 'react-redux';

const useStyles = (theme) => ({
    small: {
        width: '25px',
        height: '25px',
    },
    comments: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',

    },
});
class CommentDisplay extends Component {
    constructor() {
        super()
        this.state = {
            postComments: [],
            userData:null
        }
    }
    handleClikDisplayName=()=>{
        const {setModalStatus}=this.props
        setModalStatus(false)
    }
    componentDidMount() {
        const { uuid } = this.props
        const getUserComments = async () => {
            const commentRef = firestore.collection('comments').doc(uuid)
            const commentSnapshot = await commentRef.get()
            if (commentSnapshot.exists) {
                const userCommentsArray = commentSnapshot.data().userComments
                userCommentsArray.map(k => {
                    this.setState({ postComments: [...this.state.postComments, k] })
                    const getUser = async () => {
        
                        const userRef = firestore.collection('users').doc(k.userUid)
                        const userSnapshot = await userRef.get()
                        const userData = userSnapshot.data()
                        this.setState({ userData: userData })
                    }
                    getUser()
                })
            }

        }

        getUserComments()
    }
    render() {
        const { classes } = this.props
        const {userData}=this.state
        return (
            <CardContent>
                {
                    this.state.postComments.map(c => (
                        <div className={classes.comments}>
                           {userData?<Avatar className={classes.small} src={userData.avatar}></Avatar>:null}
                            {userData?<Link to={`/${userData.uid}`}><span style={{ fontWeight: 'bold' }} onClick={this.handleClikDisplayName}>{userData.displayName}</span></Link>:null}
                            <Typography style={{ marginLeft: '10px' }} variant="subtitle2" gutterBottom>
                                {c.comment}
                            </Typography>
                        </div>



                    ))
                }
            </CardContent>
        )
    }
}
const mapdispatchToProps=dispatch=>({
    setModalStatus:modal=>dispatch(setModalStatus(modal))
})
export default connect(null,mapdispatchToProps)(withStyles(useStyles, { withTheme: true })(CommentDisplay));
// const CommentDisplay=(uuid)=>{
//     const [postComments,setPostComments]=useState([])


// }



// const getUser=async()=>{
//     const userRef=firestore.collection('users').doc(k.userUid)
//     const userSnapshot=await userRef.get()
//     const userData=userSnapshot.data()
//     this.setState({userData:userData})
// }
// getUser()