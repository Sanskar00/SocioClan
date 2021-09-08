//libraries
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useHistory } from 'react-router';
import { Grid, Paper, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
//fireabase

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })
  const history = useHistory()
  const { email, password } = userCredentials;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value })
    console.log(value)

  }
  const login = async (event) => {
    event.preventDefault();
    const { user } = await auth.signInWithEmailAndPassword(email, password);//for signing with email and password
    console.log(userCredentials)
    history.push('/')
  }
  const paperStyle = {
    padding: '20px',
    height: '60vh',
    width: 450,
    margin: ' 100px auto'
  }
  const fieldAndButtonMargin={
    marginTop:'10%'
  }
  const brand={
    marginTop:'20%'
  }
 
 
  const signUp={
    color:'blue'
  }
  const signUpText={
    fontWeigth:'normal'
  }
  return (
    <div>
      <form onSubmit={login}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center' style={brand}>
              <h2>SocioClan</h2>
            </Grid>
            <Grid style={fieldAndButtonMargin}>
              <TextField variant='outlined' name="email" label='Email' placeholder='Enter email' fullWidth style={fieldAndButtonMargin}  type="text" onChange={handleChange}></TextField>
              <TextField variant='outlined' name="password" label='Passoword' placeholder='Enter password' fullWidth type='password' style={fieldAndButtonMargin} onChange={handleChange}></TextField>
            </Grid>
            <Button variant='contained' type='submit' color='primary' fullWidth style={fieldAndButtonMargin}>Sign In</Button>
            <h3 style={signUpText} align='center'>Don't have account?<Link style={signUp} to='/signUp'>SignUp</Link></h3>
            

          </Paper>
        </Grid>
      </form>
    </div>
  );
};
export default SignIn;
