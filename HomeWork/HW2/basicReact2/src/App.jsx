import { useState } from 'react'
import CCButtonChangeColor from './FuncComps/ClassComps/CCButtonChangeColor'
import CCIsPsychometry from './FuncComps/ClassComps/CCIsPsychometry'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <CCButtonChangeColor/><br/>
      <CCIsPsychometry/><br/>

    </>
  )
}

export default App
