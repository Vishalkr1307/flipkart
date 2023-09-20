import { Alert, AlertIcon, Box, Button, HStack, Heading, IconButton, PinInput, PinInputField, Spinner, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { postOtpData, postResendData } from '../redux/auth/action'

export const OtpVerification = ({}) => {
    const bgCOlor=useColorModeValue("gray.50","gray.600")
    const {id}=useParams()
    const {isLoading,isAuth,isVerify,isResend,isError,user,token,profile,status,message}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const [otp,setOtp]=useState({otp:""})
    const navigate=useNavigate()
    const location=useLocation()
   
    


    
    const handleOtp=()=>{
        if(id && otp){

            dispatch(postOtpData(id,otp))
        }

    }
    useEffect(()=>{
        if(status && message && isVerify && isAuth){
            navigate(location?.state?.from?.pathname==="/auth/login" ? "/":location?.state?.from?.pathname ==="/auth/login/forgetpassword"?`/auth/login/forgetpassword/resetpassword/${user?.userId}`:"/auth/login",{replace:true})
        }

    },[status,message])
    const handleResend=()=>{
        if(user.userId && user.email && user.name){
            let data={
               userId:user.userId,
               email:user.email,
               name:user.name

            }
            if(data){

                dispatch(postResendData(data))
            }

        }
    }
   
    
  return (
    <Box bg={bgCOlor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack alignItems={'center'} spacing={4}>
            <Stack alignItems={'center'}>
                <Heading>Otp to sent to your {user?user.email:"email"}</Heading>
            </Stack>
            <Stack bg={useColorModeValue("white")} px={8} width={'lg'}  py={8} spacing={4} rounded={'xl'} shadow={'2xl'} >
                {isError && !isLoading && <Alert status='error'>
                    <AlertIcon/>
                    {isError}
                    </Alert>}
                {isResend && status && <Alert status='success'>
                    <AlertIcon/>
                    {status}
                    </Alert>}

                <HStack justifyContent={'center'}>
                    <PinInput size={'lg'} otp onChange={(val)=>setOtp({otp:val})}>
                        <PinInputField/>
                        <PinInputField/>
                        <PinInputField/>
                        <PinInputField/>
                    </PinInput>
                </HStack>
                <Stack px={14} spacing={0}>
                    <Button color={'blue.400'} onClick={handleResend}>{isLoading && !isResend ?<Spinner/>:"Resend-it"}</Button>

                    <Button variant={'solid'} onClick={handleOtp} colorScheme='teal'>{isLoading && !isVerify?<Spinner/>:"Verify-Otp"}</Button>
                </Stack>
            </Stack>
            

        </Stack>
    </Box>
  )
}
