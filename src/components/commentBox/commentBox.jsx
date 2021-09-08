import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Avatar, Button } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selector';
import { connect } from 'react-redux';
import { firestore } from '../../firebase/firebase';
import { useState } from 'react';
import { setCurrentUser } from '../../redux/user/user.action';
import firebase from 'firebase';
import { Component } from 'react';
const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    primaryButton: {
        marginLeft: "auto"
    }
}));

const CommentBox = ({ currentUser, uuid }) => {
    const classes = useStyles();

    const [comment, setComment] = useState('')
    const onCommentChange = (event) => {
        setComment(event.target.value)
    }
    const submitComment = async(event) => {
        const commentRef = firestore.collection('comments').doc(uuid)
        const commentSnapshot = await commentRef.get()
        if (!commentSnapshot.exists) {
            commentRef.set({
                userComments: [{
                    userUid:currentUser.uid,
                    comment: comment
                }]

            })
        }
        else {
            commentRef.update({
                userComments: firebase.firestore.FieldValue.arrayUnion({
                    userUid:currentUser.uid,
                    comment: comment
                })
            })
        }
    }



    return (
        <div>

            <TextField
                id="filled-full-width"
                multiline
                
                placeholder="Add a comment..."
                fullWidth
                onChange={onCommentChange}
                margin="normal"
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Avatar className={classes.small} src={currentUser ? currentUser.avatar : null}></Avatar>
                        </InputAdornment>

                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button onClick={submitComment} ariant="outlined" color="primary">Post</Button>
                        </InputAdornment>
                    )
                }}

            />

        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})
export default connect(mapStateToProps)(CommentBox);