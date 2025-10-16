
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddProduct from './Component/AddProduct/AddProduct'
import Signin from './Component/Signin/Signin'
import Signup from './Component/Signup/Signup'

function App() {

  return (
    <>
    <Routes>
      <Route path='/Signup' element = {<Signup/>}/>
      <Route path='/Signin' element = {<Signin/>}/>
      <Route path='/addProduct' element = {<AddProduct/>}/>
    </Routes>
    </>
  )
}

export default App
