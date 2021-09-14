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
import { CardHeader } from '@material-ui/core';
const useStyles = (theme) => ({
    small: {
        width: '30px',
        height: '30px',
    },
    comments: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',

    },
    comment: {
        display: 'flex',
        marginTop: '5.5px',
        marginLeft:'5px'

    }
});
class CommentDisplay extends Component {
    constructor() {
        super()
        this.state = {
            postComments: [],
            userData: []
        }
    }
    handleClikDisplayName = () => {
        const { setModalStatus } = this.props
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
                    const getUser = async () => {

                        const userRef = firestore.collection('users').doc(k.userUid)
                        const userSnapshot = await userRef.get()
                        const user = userSnapshot.data()
                        this.setState({ userData: [...this.state.userData, { comment: k.comment, data: user }] })


                    }
                    getUser()
                })
            }

        }

        getUserComments()
    }
    render() {
        const { classes } = this.props
        const { userData } = this.state


        return (
            <CardContent>
                {
                    this.state.userData.map(c => (
                        <div className={classes.comments}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        className={classes.small}
                                        alt="Remy Sharp"
                                        src={c.data.avatar}
                                    />
                                }
                                title={<Link to={`/${c.data.uid}`} style={{ fontWeight: 'bold',}} onClick={this.handleClikDisplayName}>{c.data.userName}</Link>}
                            />
                            <Typography  variant="subtitle2" gutterBottom>
                                {c.comment}
                            </Typography>

                        </div>



                    ))
                }
            </CardContent>
        )
    }
}
const mapdispatchToProps = dispatch => ({
    setModalStatus: modal => dispatch(setModalStatus(modal))
})
export default connect(null, mapdispatchToProps)(withStyles(useStyles, { withTheme: true })(CommentDisplay));
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
// {userData ? <Avatar className={classes.small} src={c.data.avatar}></Avatar> : null}
//                             {userData ? <Link to={`/${c.data.uid}`}><span style={{ fontWeight: 'bold' }} onClick={this.handleClikDisplayName}>
//                                 {c.data.displayName}</span>
//                             </Link> : null}
//                             <Typography className={classes.comment} variant="subtitle2" gutterBottom>
//                                 {c.comment}
//                             </Typography>