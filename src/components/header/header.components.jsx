// libraries
import React, { useState, useRef } from "react";
import "./header.scss";
import { Link } from "react-router-dom";import { createStructuredSelector } from "reselect";

//firebase
import { storage, firestore, auth } from "../../firebase/firebase";

//components
import UploadToDatabase from "../uploadToDatabase/uploadToDatabase";
import { UPDATE_OPERATORS } from "@babel/types";
import { selectCurrentUser } from "../../redux/user/user-selector";
import { connect } from "react-redux";

//materialUi
import { Avatar } from "@material-ui/core";



const Header = ({currentUser}) => {
  const [filesName, setFile] = useState("");
  const [img, setImage] = useState("");
  const [hidden, setHidden] = useState(true);
  const refInput = useRef();
  const focus = () => {
    refInput.current.click();
  };

  const fileHander = async (event) => {
    const file = event.target.files[0];
    const storageRef = storage.ref(); //Refernce to storage
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file); //putting file in  file ref or in filename document
    setImage(await fileRef.getDownloadURL());
    setFile(file.name);
    setHidden((hidden) => (hidden = !hidden));
  };

  const loggedOut = async (event) => {
    event.preventDefault();
    auth.signOut().then(() => {
      console.log("userSignedOut");
    });
  };
  return (
    <div className='headerBackground'>
       <div className="header">
      <div className="logoContainer">
        <h2>SocioClan</h2>
      </div>
      <div className={`${hidden ? "options" : "optionsPointerDisable"}`}>
        <Link to="/signUp" className="option">
          Sign Up
        </Link>
        <Link to="/signIn" className="option">
          Sign In
        </Link>
        <span className="option" onClick={loggedOut}>
          Log Out
        </span>
        <form onSubmit={onsubmit}>
          <input
            style={{ display: "none" }}
            type="file"
            onChange={fileHander}
            ref={refInput}
          ></input>
          <input
            value="&#x2B;"
            type="button"
            onClick={focus}
            className="option addButton"
          ></input>
        </form>

        {hidden ? null : <UploadToDatabase image={img} filename={filesName} />}

        {
          currentUser?currentUser.avatar?<Avatar alt={currentUser.displayName} src={currentUser.avatar} className="avatar"/>: <Avatar src="/broken-image.jpg" className="avatar" alt={currentUser.avatar}/>:null

          // currentUser?<img src={currentUser.avatar} className='avatar option'></img>:null
        }
        
      </div>
    </div>
    </div>
   
  );
};

const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser
})
export default connect(mapStateToProps)(Header);
