//library
import "./App.css";
import { Component } from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";

//firebase
import firebase from "firebase";
import {
  auth,
  createUserProfileDocument,
  firestore,
} from "./firebase/firebase";
import { storage } from "./firebase/firebase";
import React from "react";

//Components
import Header from "./components/header/header.components";
import SignIn from "./page/SignIn/sign-in";
import SignUp from "./page/sign-up/sign-up";
import Home from "./page/Home/home";

//redux
import { setCurrentUser } from "./redux/user/user.action";
import ProfilePage from "./page/ProfilePage/profilePage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      img: "",
      posts: [],
      files: {},
    };
  }

  componentDidMount() {
    const { setCurrentUser } = this.props;
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
    });
    firestore.collection("posts").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        this.setState({ posts: [...this.state.posts, change.doc.data()] });
      });
      console.log(this.state.posts);
    });
  }

  // fetching post from firestore data base

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
          <Route exact path="/" component={Home}></Route>
            <Route path="/signUp" component={SignUp}></Route>
            <Route path="/signIn" component={SignIn}></Route>
            <Route path="/:id" component={ProfilePage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(App);
