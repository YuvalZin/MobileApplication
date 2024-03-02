import { useState, useEffect } from 'react'
import FCLogin from "../src/FuncComps/FCLogin"
import FCRegister from '../src/FuncComps/FCRegister'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FCProfile from "../src/FuncComps/FCProfile";
import './App.css';
import FCEditDetails from './FuncComps/FCEditDetails';

function App() {

  const [loginIsVisible, setLoginIsVisible] = useState(false);
  const [signUpIsVisible, setSignUpIsVisible] = useState(false);
  const [buttonsIsVisible, setButtonsIsVisible] = useState(true);
  const [editProfileIsVisible, setEditIsVisible] = useState(false);

  const [userNotFoundErr, setUserNotFoundErr] = useState();
  const [userExistErr, setUserExistErr] = useState();

  const setLoginVisibility = (isVisible) => {
    if (isVisible) {
      setSignUpIsVisible(!isVisible);
    }
    setLoginIsVisible(isVisible);
  }
  const setSignUpVisiblity = (isVisible) => {
    if (isVisible) {
      setLoginIsVisible(!isVisible);
    }
    setSignUpIsVisible(isVisible);
  }

  useEffect(() => {
    loadUsers();
    return () => {
    }
  }, [])

  const loadUsers = () => {
    let usersTmp = [];
    if (localStorage["users"] != null) {
      usersTmp = JSON.parse(localStorage.getItem("users"));
      console.log(usersTmp);
    }
    else {
      console.log("users is null");
    }
    return usersTmp;
  }


  const loginUser = (loginInfo) => {
    let users = loadUsers();
    const username = loginInfo.get("username");
    const password = loginInfo.get("password");

    // const loggedInUser = sessionStorage.getItem('userLogged');
    // if (loggedInUser) {
    //   console.log("There is already a user logged in:");
    //   return;
    // }
    const user = users.find(u => u.userName === username && u.password === password);
    if (user) {
      // User found -login
      console.log("User logged in:", user);
      sessionStorage.setItem('userLogged', JSON.stringify(user));
      setLoginIsVisible(false);
      setSignUpIsVisible(false);
      setButtonsIsVisible(false);
      setEditIsVisible(true);
      setUserNotFoundErr("");


    } else {
      // User not found / incorrect password
      setUserNotFoundErr("Invalid username or password");
    }
  }

  const logoutUser = () => {
    setButtonsIsVisible(true);
    sessionStorage.clear();
    setEditIsVisible(false);

  }

  const addUserToLocalstorage = (user) => {
    let updatedUsers = loadUsers(); 
    //validate if username already exists.
    if (updatedUsers.map(u => u.userName).includes(user.userName)) {
      setUserExistErr("Username already exists in our system!");
      return; 
    }
    
    setUserExistErr("");
    updatedUsers.push(user); 
    localStorage.setItem('users', JSON.stringify(updatedUsers)); 
  };

  //user register 
  const registerUser = (formData) => {
    console.log(formData.get("city"));
    let user =
    {
      userName: formData.get("username"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      photo: formData.get("photo"),
      birthdate: formData.get("birthdate"),
      city: formData.get("city"),
      street: formData.get("street"),
      streetNum: formData.get("streetNum"),
      password: formData.get("password")
    }
    addUserToLocalstorage(user);

  }


  return (
    <>

      <div style={{ display: 'flex', justifyContent: "center" }}>
        <span style={{ width: '35%' }}>
          <FCProfile logOut={logoutUser} />
        </span>
      </div>
      <div style={{ margin: 'auto', width: '45%' }}>
        {editProfileIsVisible && <FCEditDetails />}
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: "space-around" }}>


        {buttonsIsVisible && <div>
          <Button
            onClick={() => setLoginVisibility(true)}
            variant="contained" color='inherit' endIcon={<LoginIcon color='secondary' />} style={{ marginTop: '30%', marginRight: 20, width: 150, padding: 20 }}>Log In</Button>
          <Button
            onClick={() => setSignUpVisiblity(true)}
            variant="contained" color='inherit' endIcon={<AppRegistrationIcon color='secondary' />} style={{ marginTop: '30%', marginLeft: 20, width: 150, padding: 20 }}>Sign Up</Button>
        </div>}
      </div>


      <div style={{ display: 'flex', justifyContent: "space-around", flexDirection: "column", alignItems: 'center' }}>
        <div style={{ width: '45%' }}>
          {loginIsVisible && <FCLogin userNotFoundErr={userNotFoundErr} sendLoginRequest={loginUser} />}
        </div>

        <div style={{ width: '45%' }}>
          {signUpIsVisible && <FCRegister userExistErr={userExistErr} sendForm2P={registerUser} />}
        </div>

      </div>
    </>
  )
}

export default App
