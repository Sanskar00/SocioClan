import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setCurrentUser, setMenuStaus } from '../../redux/user/user.action';
import { selectCurrentUser, selectMenuStatus } from '../../redux/user/user-selector';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { useHistory } from 'react-router';
function SimpleMenu({menu,setMenuStaus,currentUser,setCurrentUser}) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const history =useHistory();
   
    const loggedOut = async (event) => {
      event.preventDefault();
      await auth.signOut().then(() => {
        console.log("userSignedOut");
      });
      history.push('/')
      setCurrentUser(null)
      setMenuStaus(null)
    };
    const handleClose = (event) => {
      setMenuStaus(null)
     

    };
  
    return (
      <div>
        
        <Menu
          id="simple-menu"
          anchorEl={menu}
          keepMounted
          open={Boolean(menu)}
          onClose={handleClose}
        >
          {(currentUser)?<MenuItem onClick={handleClose}><Link to={`/${currentUser.uid}`}>Profile</Link></MenuItem>:null}
          {(currentUser)?<MenuItem onClick={loggedOut}><Link to='/'>Logout</Link></MenuItem>:<MenuItem ></MenuItem>}
        </Menu>
      </div>
    );
  }
  const mapStateToProps=createStructuredSelector({
      menu:selectMenuStatus,
      currentUser:selectCurrentUser
  })
  const mapdispatchToProps=dispatch=>({
    setMenuStaus:menu=>dispatch((setMenuStaus(menu))),
    setCurrentUser:currentUser=>dispatch(setCurrentUser(currentUser))
  })
  export default connect(mapStateToProps,mapdispatchToProps)(SimpleMenu)