import { useState, useEffect } from 'react'
import FCSignInSide from "../src/FuncComps/SignInSide"

import './App.css'

function App() {

  useEffect(() => {
    loadUsers();

    return () => {
      console.log('unmount');
    }
  }, [])


  const loadUsers = () => {
    let users = [];
    if (localStorage["users"] != null) {
      users = localStorage["users"];
      console.log(users);
    }
    else 
    { 
      console.log("users is null");
      return users;
    }
    
  }

  return (
    <>
    <FCSignInSide/>
    </>
  )
}

export default App
