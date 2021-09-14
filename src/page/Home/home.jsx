// libraries
import React, { useState } from 'react';
import { Component } from 'react';
import { useEffect } from 'react';
import SimpleContainer from '../../components/homeContainer/homeContainer';
import { firestore } from '../../firebase/firebase';
import { getPost } from '../../firebase/firebase';
import LikeModal from '../../components/likeModal/likeModal';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            allPosts: []
        }
    }
    componentDidMount() {
        const postsSnapshot = firestore.collection('posts').orderBy('userPost').get()
        const postSortedArray=[]
        postsSnapshot.then(snapshot => {
            snapshot.docs.map(doc => {
                doc.data().userPost.map(post => {
                    this.setState({ allPosts: [...this.state.allPosts, post].sort((a,b)=>b.createdAt-a.createdAt) })
                })
            })
        })

    }

    render() {
        return (
            <div>
               <SimpleContainer posts={this.state.allPosts}/>
               <LikeModal></LikeModal>
            </div>
        )
    }
}
export default Home;


