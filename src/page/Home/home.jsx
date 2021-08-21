// libraries
import React, { useState } from 'react';
import { Component } from 'react';
import { useEffect } from 'react';
import SimpleContainer from '../../components/homeContainer/homeContainer';
import { firestore } from '../../firebase/firebase';
import { getPost } from '../../firebase/firebase';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            allPosts: []
        }
    }
    componentDidMount() {
        const postsSnapshot = firestore.collection('posts').get()
        postsSnapshot.then(snapshot => {
            snapshot.docs.map(doc => {
                doc.data().userPost.map(post => {
                    this.setState({ allPosts: [...this.state.allPosts, post] })
                    console.log(this.state.allPosts)
                })
            })
        })

    }

    render() {
        return (
            <div>
               <SimpleContainer posts={this.state.allPosts}/>
            </div>
        )
    }
}
export default Home;


