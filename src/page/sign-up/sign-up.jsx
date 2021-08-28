// libraries
import React, { useState } from "react";
import { Form, InputLabel, Input } from "@material-ui/core";

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
  });
  const [avatar, setAvatar] = useState("");
  const { displayName, email } = userCredentias;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentias, [name]: value });
  };
  const signUpSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = userCredentias;
    const { user } = await auth.createUserWithEmailAndPassword(email, password); //for sign up using email and password
    const {uid}=user
    await createUserProfileDocument(user, { displayName, avatar ,uid});
  };    
  const fileHander = async (event) => {
    const file = event.target.files[0];
    const storageRef = storage.ref(); //Refernce to storage
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file); //putting file in  file ref or in filename document
    setAvatar(await fileRef.getDownloadURL())
    console.log(avatar)
  };

  return (
    <div>
      <form onSubmit={signUpSubmit}>
        <label for="displayName">name</label>
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
        />
        <label for="avatar">Profile Picture</label>
        <input type="file" name="avatar" onChange={fileHander} />
        <button>Sign UP</button>
      </form>
    </div>
  );
};
export default SignUp;
