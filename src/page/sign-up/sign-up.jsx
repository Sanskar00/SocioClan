// libraries
import React, { useState } from "react";
import { Form, InputLabel, Input, Grid, Paper, TextField, Button, Link } from "@material-ui/core";
import { useHistory } from "react-router";

// firebase
import {
  auth,
  createUserProfileDocument,
  storage,
} from "../../firebase/firebase";

const SignUp = () => {
  const [userCredentias, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userName:''
  });
  const history=useHistory()
  const [avatar, setAvatar] = useState("");
  const { displayName, email,userName } = userCredentias;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentias, [name]: value });
  };
  const signUpSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = userCredentias;
    const { user } = await auth.createUserWithEmailAndPassword(email, password); //for sign up using email and password
    const { uid } = user
    history.push('/')
    await createUserProfileDocument(user, { displayName, uid,userName });
  };
  const fileHander = async (event) => {
    const file = event.target.files[0];
    const storageRef = storage.ref(); //Refernce to storage
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file); //putting file in  file ref or in filename document
    setAvatar(await fileRef.getDownloadURL())
    console.log(avatar)
  };
  const paperStyle = {
    padding: '20px',
    height: '80vh',
    width: 500,
    margin: ' 100px auto'
  }
  const fieldAndButtonMargin = {
    marginTop: '10%'
  }
  const brand = {
    marginTop: '10%'
  }


  const signIn = {
    color: 'blue'
  }
  const signUpText = {
    fontWeigth: 'normal'
  }

  return (
    <div>
      <form onSubmit={signUpSubmit}>
        {/* <label for="displayName">name</label>
        <input
          type="text"
          name="displayName"
          placeholder="name"
          onChange={handleChange}
        />
        <label for="email">email</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <label for="password">password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <label for="confirmPassword">confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirmPassword"
          onChange={handleChange}
        /> */}
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center' style={brand}>
              <h1>SocioClan</h1>
            </Grid>
            <Grid style={fieldAndButtonMargin}>
              <TextField variant='outlined' name="email" label='Email' placeholder='Enter email' fullWidth style={fieldAndButtonMargin} type="text" onChange={handleChange}></TextField>
              <TextField variant='outlined' name="displayName" label='Fullname' placeholder='Enter fullname' fullWidth style={fieldAndButtonMargin} type="text" onChange={handleChange}></TextField>
              <TextField variant='outlined' name="userName" label='Username' placeholder='Enter username' fullWidth style={fieldAndButtonMargin} type="text" onChange={handleChange}></TextField>
              <TextField variant='outlined' name="password" label='Passoword' placeholder='Enter password' fullWidth type='password' style={fieldAndButtonMargin} onChange={handleChange}></TextField>

            </Grid>
              <Button variant='contained' type='submit' color='primary' fullWidth style={fieldAndButtonMargin}>Sign Up </Button>
            <h3 style={signUpText} align='center'> Have account?<Link style={signIn} to='/signIn'>SignIn</Link></h3>


          </Paper>
        </Grid>
      </form>
    </div>
  );
};
export default SignUp;
