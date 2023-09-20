import { Alert, AlertIcon, Box, Button, Checkbox, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useReducer, useState } from 'react'
import {ViewIcon,ViewOffIcon} from "@chakra-ui/icons"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postRegisterData } from '../redux/auth/action'
const init={
    name:"",
    email:"",
    password:"",
}

const reducer=(store,{type,payload})=>{
    switch(type){
        case "name":
            return {...store,name: payload}
        case 'email':
            return {...store,email:payload}
        case 'password':
            return {...store,password:payload}
        default:
            return {...store}
    }

}

export const Register = () => {
    const bgColor=useColorModeValue("gray.50","gray.700")
    const [showPassword,setShowPassword]=useState(false)
    const [text,setText]=useReducer(reducer,init)
    const {isLoading,isError,user,isRegister}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogin=()=>{
        if(text){
            dispatch(postRegisterData(text))
        }
    }
    useEffect(()=>{
        if(user.userId && isRegister){
            navigate(`/auth/register/verifyotp/${user.userId}`)
        }

    },[user.userId,isRegister])
    
  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack spacing={8}>
            <Box >
                <Stack align={'center'}>
                    <Heading>Sign Up to your account</Heading>
                    <Text>to enjoy all of our cool <span color='blue.400'>feautres</span></Text>
                </Stack>
            </Box>
            <Box bg={useColorModeValue("white",'white.500')} px={8} py={8} rounded={'lg'}>
                {isError && !isRegister && <Alert status='error'>
                    <AlertIcon/>
                    {isError}
                    </Alert>}
                
                <Stack spacing={6}>
                    <FormControl id='name'>
                        <FormLabel>Name</FormLabel>
                        <Input type='text' onChange={(e)=>setText({type:"name",payload:e.target.value})}/>
                    </FormControl>
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
                    <Button bg={'teal.200'} onClick={handleLogin}>{isLoading?<Spinner/>:"Login"}</Button>
                    <Stack align={'center'}>
                        <Text>already have a account ? <Link to="/auth/login">Login</Link></Text>
                    </Stack>
                        
                        
                </Stack>
            </Box>
        </Stack>

    </Box>
  )
}
