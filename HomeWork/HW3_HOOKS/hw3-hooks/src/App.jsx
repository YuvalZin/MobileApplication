import { useState, useEffect } from 'react'
import FCLogin from "../src/FuncComps/FCLogin"
import FCRegister from '../src/FuncComps/FCRegister'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FCProfile from "../src/FuncComps/FCProfile";
import './App.css';
import FCEditDetails from './FuncComps/FCEditDetails';
import Swal from 'sweetalert2';
import FCSystemAdmin from './FuncComps/FCSystemAdmin';


function App() {

  const [loginIsVisible, setLoginIsVisible] = useState(false);
  const [signUpIsVisible, setSignUpIsVisible] = useState(false);
  const [buttonsIsVisible, setButtonsIsVisible] = useState(false);
  const [editVisible, setEditVisible] = useState('none');


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
    if (sessionStorage.getItem('userLogged') != null) {
      setButtonsIsVisible(false);
    }
    return () => {
    }
  }, [])



  const loadUsers = () => {
    let usersTmp = [];
    if (localStorage["users"] != null) {
      usersTmp = JSON.parse(localStorage.getItem("users"));
    }
    return usersTmp;
  }

  const loginUser = (loginInfo) => {
    let users = loadUsers();
    const username = loginInfo.get("username");
    const password = loginInfo.get("password");

    const user = users.find(u => u.userName === username && u.password === password);
    if (user) {
      // User found -login
      sessionStorage.setItem('userLogged', JSON.stringify(user));
      setLoginIsVisible(false);
      setSignUpIsVisible(false);
      setEditIsVisible(true);
      setUserNotFoundErr("");


    } else {
      // User not found / incorrect password
      setUserNotFoundErr("Username or password is incorrect");
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
    if (updatedUsers.map(u => u.email).includes(user.email)) {
      setUserExistErr("This email is already in use. Please choose another one");
      return;
    }

    setUserExistErr("");
    updatedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    sessionStorage.setItem('userLogged', JSON.stringify(user));
    setLoginIsVisible(false);
    setSignUpIsVisible(false);
    setEditIsVisible(true);
  };

  //user register 
  const registerUser = (formData) => {
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

  const editUser = (formData) => {

    let users = loadUsers();
    let userIndex = users.findIndex(u => u.email === formData.email);

    users[userIndex].userName = formData.username;
    users[userIndex].firstName = formData.firstName;
    users[userIndex].lastName = formData.lastName;
    users[userIndex].birthdate = formData.birthdate;
    users[userIndex].street = formData.street;
    users[userIndex].streetNum = formData.streetNum;
    users[userIndex].city = formData.city;

    if (formData.photo != "") {
      users[userIndex].photo = formData.photo;
    }

    if (formData.password != "") {
      users[userIndex].password = formData.password;
    }
    localStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('userLogged', JSON.stringify(users[userIndex]));
    Swal.fire({
      title: "Changes Saved",
      text: "Your updates have been successfully saved.",
      icon: "success"
    });
    setEditVisible('none');
  }

  const adminEditUser = (userEmail) =>
  {

  }

  return (
    <>
      <div>
        <FCSystemAdmin setEditVisible={setEditVisible} adminEditUser={adminEditUser}/>
      </div>
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <div style={{ width: '35%' }}>
          <FCProfile setEditVisible={setEditVisible} logOut={logoutUser} />
        </div>
      </div>
      <div style={{ display:editVisible,margin: 'auto', width: '45%' }}>
      <FCEditDetails sendUpdatedForm2P={editUser} />
      </div>

      <div style={{ marginTop: '10%', width: '100%', display: 'flex', justifyContent: "space-around" }}>


        {buttonsIsVisible && <div>
          <Button
            onClick={() => setLoginVisibility(true)}
            variant="contained" color='inherit' endIcon={<LoginIcon color='secondary' />} style={{ marginRight: 20, width: 150, padding: 20 }}>Log In</Button>
          <Button
            onClick={() => setSignUpVisiblity(true)}
            variant="contained" color='inherit' endIcon={<AppRegistrationIcon color='secondary' />} style={{ marginLeft: 20, width: 150, padding: 20 }}>Sign Up</Button>
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
