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
import { selectCurrentUser,  } from "./redux/user/user-selector";
import { selectLoadingStatus } from "./redux/user/user-selector";
import { CircularProgress } from "@material-ui/core";
import { withTheme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { classes } from "istanbul-lib-coverage";
import { setLoading } from "./redux/user/user.action";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  spinner: {
      marginTop:'22.5%',
      marginLeft:'50%',
      [theme.breakpoints.down('sm')]:{
        marginTop:'65%',
        marginLeft:'45%'
    },
    [theme.breakpoints.down('xsm')]:{
      marginTop:'65%',
      marginLeft:'45%'
  }



  }
}))
const App=(props)=>{
const {currentUser,loading,setLoading,setCurrentUser}=props
const classes=useStyles()

  useEffect(()=>{
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
  },[])

  // fetching post from firestore data base
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
      setTimeout(()=>{
        setLoading(true)
      },4000)

      return (
        <Router>

          <div className="SignIn">
            <Switch>
              {!loading && <CircularProgress className={classes.spinner}/>}
            {<Route exact path="/" component={SignIn}></Route>}
              <Route path="/signUp" component={SignUp}></Route>
            </Switch>
          </div>
        </Router>

      )
    }
  }

const mapDispatchToProps = (dispatch) => ({
  setLoading:(loading)=>dispatch(setLoading(loading)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
const mapStateToProps = ({user})=>({
  currentUser: user.currentUser,
  loading:user.loading

})
export default connect(mapStateToProps, mapDispatchToProps)(App)
