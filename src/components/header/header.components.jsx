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
import { Avatar, Grid, Paper } from "@material-ui/core";
import SimpleMenu from "../menu/menu";
import { setMenuStaus } from "../../redux/user/user.action";



const Header = ({currentUser,setMenuStaus}) => {
  const [filesName, setFile] = useState("");
  const [img, setImage] = useState("");
  const [hidden, setHidden] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const refInput = useRef();
  const focus = () => {
    refInput.current.click();
  };
  const handleClickMenu = (event) => {
    setMenuStaus(event.currentTarget)
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

 
  return (
    <Grid>
      <Paper elevation={2}>
      <div className='headerBackground'>
       <div className="header">
      <div className="logoContainer">
        <Link to="/"><h2>SocioClan</h2></Link>
      </div>
      <div className={`${hidden ? "options" : "optionsPointerDisable"}`}>
        {/* <span className="option" onClick={loggedOut}>
          Log Out
        </span> */}
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
          currentUser?currentUser.avatar?
          <Avatar alt={currentUser.displayName} src={currentUser.avatar} className="avatar" onClick={handleClickMenu}/>
          : <Avatar src="/broken-image.jpg" className="avatar" alt={currentUser.avatar} onClick={handleClickMenu}/>:null

          // currentUser?<img src={currentUser.avatar} className='avatar option'></img>:null
        }
        <SimpleMenu menuPops={anchorEl}></SimpleMenu>
        
      </div>
    </div>
    </div>
      </Paper>
    </Grid>
    
   
  );
};

const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser
})
const mapdispatchToProps=dispatch=>({
  setMenuStaus:menu=>dispatch((setMenuStaus(menu)))
})
export default connect(mapStateToProps,mapdispatchToProps)(Header);
