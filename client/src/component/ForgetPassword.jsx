import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input, Spinner, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { postForgetData } from '../redux/auth/action'

export const ForgetPassword = () => {
    const bgColor=useColorModeValue("gray.50","gray.900")
    const [text,setText]=useState({
        email:""
    })
    const {user,isLoading,isForget,isError}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const handlePassword=()=>{
        dispatch(postForgetData(text))
        
    }
    useEffect(()=>{
        if(user.userId && isForget){
            navigate(`/auth/login/verifyotp/${user.userId}`,{replace:true,state:{from:location}})
        }

    },[user.userId,isForget])
  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack alignItems={'center'} spacing={8}>
            <Box>
                <Heading>Forget-Password</Heading>
            </Box>
            <Stack bg={useColorModeValue("white","white.100")} px={8} py={8} rounded={'xl'} spacing={6} width={'lg'}>
                {isError && <Alert status='error'>
                    <AlertIcon/>
                    {isError}
                    </Alert>}
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='text' onChange={(e)=>setText({email:e.target.value})}/>
                </FormControl>
                <Button colorScheme='teal' variant={'solid'} onClick={handlePassword}>{isLoading && !isForget?<Spinner/>:"Forget-Password"}</Button>
            </Stack>
        </Stack>
    </Box>
  )
}
