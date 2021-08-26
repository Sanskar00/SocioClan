import { CardContent } from '@material-ui/core'
import React from 'react'
import { Component } from 'react';
import { firestore } from '../../firebase/firebase'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
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
class CommentDisplay extends Component{
    constructor(){
        super()
        this.state={
            postComments:[],
        }
    }
    componentDidMount(){
        const {uuid}=this.props
        const getUserComments = async () => {
            const commentRef = firestore.collection('comments').doc(uuid)
            const commentSnapshot = await commentRef.get()
            if (commentSnapshot.exists) {
                const userCommentsArray = commentSnapshot.data().userComments
                userCommentsArray.map(k => {
                    this.setState({ postComments: [...this.state.postComments, k] })
                })
            }

        }

        getUserComments()
    }
    render(){
        const {classes}=this.props
        return(
            <CardContent>
                {
                this.state.postComments.map(c => (
                    <div className={classes.comments}>
                        <Avatar className={classes.small} src={c.avatar}></Avatar>
                        <span style={{fontWeight:'bold'}}>{c.displayName}</span>
                        <Typography style={{marginLeft:'10px'}} variant="subtitle2" gutterBottom>
                            {c.comment}
                        </Typography>
                    </div>



                ))
            }
            </CardContent>
        )
    }
}
export default withStyles(useStyles,{withTheme:true})(CommentDisplay);