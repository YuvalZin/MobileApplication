import { useState } from 'react'
import React, { Component } from "react";
import CCButtonChangeColor from './FuncComps/ClassComps/CCButtonChangeColor'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <CCButtonChangeColor/>
    </>
  )
}

export default App
