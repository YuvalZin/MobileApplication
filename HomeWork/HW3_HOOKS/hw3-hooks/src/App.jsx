import { useState, useEffect } from 'react'
import FCLogin from "../src/FuncComps/FCLogin"
import FCRegister from '../src/FuncComps/FCRegister'

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
    <FCLogin/>
    <FCRegister/>
    </>
  )
}

export default App
