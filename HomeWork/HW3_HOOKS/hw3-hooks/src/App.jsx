import { useState } from 'react'

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
    </>
  )
}

export default App
