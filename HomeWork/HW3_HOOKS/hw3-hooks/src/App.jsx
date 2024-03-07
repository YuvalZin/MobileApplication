import { useState, useEffect } from 'react'
import FCLogin from "../src/FuncComps/FCLogin"
import FCRegister from '../src/FuncComps/FCRegister'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FCProfile from "../src/FuncComps/FCProfile";
import './App.css';
import LogoutIcon from '@mui/icons-material/Logout';
import FCSystemAdmin from './FuncComps/FCSystemAdmin';


function App() {

  //displaying / hiding login/sign up according to states
  const [loginIsVisible, setLoginIsVisible] = useState(false);
  const [signUpIsVisible, setSignUpIsVisible] = useState(false);
  const [buttonsIsVisible, setButtonsIsVisible] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);


  const [userNotFoundErr, setUserNotFoundErr] = useState();
  const [userExistErr, setUserExistErr] = useState();




//setting visibilty func on buttons clicked
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

  //load user on mount
  useEffect(() => {
    loadUsers();
    let userLogged = sessionStorage.getItem('userLogged')
    if (userLogged) {
      setButtonsIsVisible(false);
      if ((JSON.parse(userLogged)).userName == 'admin') {
        setIsAdmin(true);
      }
    }

  }, [])


  //Load users form ls
  const loadUsers = () => {
    let usersTmp = [];
    if (localStorage["users"] != null) {
      usersTmp = JSON.parse(localStorage.getItem("users"));
    }
    return usersTmp;
  }

  //Handle login user func
  const loginUser = (loginInfo) => {
    let users = loadUsers();
    const username = loginInfo.get("username");
    const password = loginInfo.get("password");
    if (username == "admin" && password == "ad12343211ad") {
      setIsAdmin(true);
      let admin = { userName: username }
      sessionStorage.setItem('userLogged', JSON.stringify(admin));
      setLoginIsVisible(false);
      setSignUpIsVisible(false);
    }
    else {
      let user = users.find(u => u.userName === username && u.password === password);
      if (user) {
        // User found -login
        sessionStorage.setItem('userLogged', JSON.stringify(user));
        setLoginIsVisible(false);
        setSignUpIsVisible(false);
        setButtonsIsVisible(false);
        setUserNotFoundErr("");
      }
      else {
        // User not found / incorrect password - display error message.
        setUserNotFoundErr("Username or password is incorrect");
      }
    }
  }

  const logoutUser = () => {
    sessionStorage.clear();
    // Clear user session data and reset admin status.
    setIsAdmin(false);
    setButtonsIsVisible(true);
  }

  // This function adds a user to local storage.
  const addUserToLocalstorage = (user) => {
    let updatedUsers = loadUsers();
    //validate if username already exists.
    if (updatedUsers.map(u => u.email).includes(user.email)) {
      setUserExistErr("This email is already in use. Please choose another one");
      return;
    }

    // Clear any previous user existence error.
    setUserExistErr("");
    updatedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    sessionStorage.setItem('userLogged', JSON.stringify(user));
    // Hide login and sign-up components and display main application.
    setLoginIsVisible(false);
    setSignUpIsVisible(false);
    setButtonsIsVisible(false);

  };

  //user register 
  const registerUser = (formData) => {
    // Construct user object from form data.
    let user =
    {
      userName: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      photo: formData.photo,
      birthdate: formData.birthdate,
      city: formData.city,
      street: formData.street,
      streetNum: formData.streetNum,
      password: formData.password
    }
    addUserToLocalstorage(user);

  }

  return (
    <>
      {isAdmin &&
        <div >
          <div style={{ textAlign: 'right', width: '100%' }}><span style={{ cursor: 'pointer' }} onClick={logoutUser}>{<LogoutIcon color='primary' />}</span></div>

          <div style={{ paddingTop: '10%', margin: 'auto', width: '70%' }}>
            <FCSystemAdmin style={{}} />
          </div>
        </div>}
      {!isAdmin && <div style={{ marginTop: '15%', display: 'flex', justifyContent: "center" }}>
        <div style={{ width: '35%' }}>
          <FCProfile logOut={logoutUser} />
        </div>
      </div>}
      {!isAdmin && <div style={{ marginTop: '3%', width: '100%', display: 'flex', justifyContent: "space-around" }}>
        {buttonsIsVisible && <div>
          <Button
            onClick={() => setLoginVisibility(true)}
            variant="contained" color='inherit' endIcon={<LoginIcon color='secondary' />} style={{ marginRight: 20, width: 150, padding: 20 }}>Log In</Button>
          <Button
            onClick={() => setSignUpVisiblity(true)}
            variant="contained" color='inherit' endIcon={<AppRegistrationIcon color='secondary' />} style={{ marginLeft: 20, width: 150, padding: 20 }}>Sign Up</Button>
        </div>}
      </div>}


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
