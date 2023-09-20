import { Alert, AlertIcon, Box, Button, Checkbox, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useReducer, useState } from 'react'
import {ViewIcon,ViewOffIcon} from "@chakra-ui/icons"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import { postLoginData } from '../redux/auth/action'
const init={
    email:"",
    password:"",
}

const reducer=(store,{type,payload})=>{
    switch(type){
        case 'email':
            return {...store,email:payload}
        case 'password':
            return {...store,password:payload}
        default:
            return {...store}
    }

}

export const Login = () => {
    const bgColor=useColorModeValue("gray.50","gray.700")
    const [showPassword,setShowPassword]=useState(false)
    const [text,setText]=useReducer(reducer,init)
    const {isLoading,isAuth,isLogin,user,isError}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    
    

    const handleLogin=()=>{
        if(text.email.trim()!="" ||text.password.trim()!=""){
            dispatch(postLoginData(text))
        }
    }
    useEffect(()=>{
        if(user.userId && isLogin && !isError){
            navigate(`/auth/login/verifyotp/${user.userId}`,{replace:true,state:{from:location}})
        }

    },[user,isError])
    
  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack spacing={8}>
            <Box >
                <Stack align={'center'}>
                    <Heading>Sign In to your account</Heading>
                    <Text>to enjoy all of our cool <span color='blue.400'>feautres</span></Text>
                </Stack>
            </Box>
            <Box bg={useColorModeValue("white",'white.500')} px={8} py={8} rounded={'lg'}>
                <Stack spacing={6}>
                    {isError && !isLoading && <Alert status='error'>
                        <AlertIcon/>
                        {isError}
                        </Alert>}
                    <FormControl id='email'>
                        <FormLabel>Email</FormLabel>
                        <Input type='text' onChange={(e)=>setText({type:"email",payload:e.target.value})}/>
                    </FormControl>
                    <FormControl id='password'>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword?"text":"password"} onChange={(e)=>setText({type:"password",payload:e.target.value})}/>
                            <InputRightElement as={'button'} onClick={()=>setShowPassword(!showPassword)}>{showPassword?<ViewIcon/>:<ViewOffIcon/>}</InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Checkbox color={'blue.500'}>Remember me</Checkbox>
                        <Link to="/auth/login/forgetpassword">ForgetPassword</Link>
                    </Stack>
                    <Button bg={'teal.200'} onClick={handleLogin}>{isLoading?<Spinner/>:"Login"}</Button>
                    <Stack align={'center'}>
                        <Text>did't have a account ? <Link to="/auth/register">Register</Link></Text>
                    </Stack>
                        
                        
                </Stack>
            </Box>
        </Stack>

    </Box>
  )
}
