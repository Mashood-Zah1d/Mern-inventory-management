
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddProduct from './Component/AddProduct/AddProduct'
import Signin from './Component/Signin/Signin'
import Signup from './Component/Signup/Signup'
import Barcodes from './Component/Barcodes/Barcodes'

function App() {

  return (
    <>
    <Routes>
      <Route path='/Signup' element = {<Signup/>}/>
      <Route path='/Signin' element = {<Signin/>}/>
      <Route path='/addProduct' element = {<AddProduct/>}/>
      <Route path='/barcode' element = {<Barcodes/>}/>
    </Routes>
    </>
  )
}

export default App
