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
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user-selector";
import { CircularProgress } from "@material-ui/core";
import { withTheme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { classes } from "istanbul-lib-coverage";

const useStyles = (theme) => ({
  root: {
    diplay: 'flex',

  },
  spinner: {
    top: '50%',
    bottom: '50%',
    postion: 'fixed'
  }
})
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
    const { currentUser } = this.props
    const { classes } = this.props
    if (currentUser) {
      return (
        <Router>
          <div className="App">
            <Header />
            <Switch>

              <Route exact path="/" component={Home}></Route>
              <Route path="/signIn" component={SignIn}></Route>
              <Route path="/signUp" component={SignUp}></Route>
              <Route path="/:id" render={(props) => (
                <ProfilePage key={props.match.params.id} {...props} />
              )} />
            </Switch>
          </div>
        </Router>
      )
    }
    else if (!currentUser) {
      return (
        <Router>

          <div className="SignIn">
            <Switch>
              <Route exact path="/" component={SignIn}></Route>
              <Route path="/signUp" component={SignUp}></Route>
            </Switch>
          </div>
        </Router>

      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles, { withTheme: true })(App))
