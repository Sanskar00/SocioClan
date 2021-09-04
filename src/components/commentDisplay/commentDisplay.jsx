import { CardContent } from '@material-ui/core'
import React from 'react'
import { Component } from 'react';
import { firestore } from '../../firebase/firebase'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { useState } from 'react';
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
                            {userData?<span style={{ fontWeight: 'bold' }}>{userData.displayName}</span>:null}
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
export default withStyles(useStyles, { withTheme: true })(CommentDisplay);
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