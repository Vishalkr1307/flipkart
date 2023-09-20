import React from 'react'
import {Route,Routes} from "react-router-dom"
import { Home } from './Home'
import { Login } from './Login'
import { Register } from './Register'
import { Product } from './Product'
import { Stack } from '@chakra-ui/react'
import { Navbar } from '../component/Navbar'
import { ForgetPassword } from '../component/ForgetPassword'
import { OtpVerification } from '../component/OtpVerification'
import { ProductCart } from '../component/ProductCart'
import { ResetPasssword } from '../component/ResetPasssword'

export const AllRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Stack>
          <Navbar/>
          <Home/>
        </Stack>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/login/verifyotp/:id' element={<OtpVerification/>}/>
        <Route path='/auth/register/verifyotp/:id' element={<OtpVerification/>}/>
        <Route path='/auth/login/forgetpassword/resetpassword/:id' element={<ResetPasssword/>}/>
        <Route path='/auth/login/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/productcart' element={<ProductCart/>}/>
    </Routes>
  )
}
