
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './Component/Signin/Signin'
import Signup from './Component/Signup/Signup'
import Barcodes from './Component/Barcodes/Barcodes'
import Header from './Component/Header/Header'
import Layout from './Component/Layout/Layout'
import AddProductPage from './Pages/AddProductPage/AddProductPage'


function App() {

  return (
    <>
    <Routes>
      <Route path= "/" element={<Layout/>}>
      <Route path='/header' element = {<Header/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/signin' element = {<Signin/>}/>
      <Route path='/addProduct' element = {<AddProductPage/>}/>
      <Route path='/barcode' element = {<Barcodes/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
