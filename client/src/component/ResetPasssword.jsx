import { Box, Button, FormControl, FormLabel, Input, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { postResetData } from '../redux/auth/action'

export const ResetPasssword = () => {
    const {isLoading,status,isReset}=useSelector((store)=>store.auth)
    const {id}=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [text,setText]=useState(({
        newPassword:"",
        
    }))
    const handleReset=()=>{
        if(id && text){

            dispatch(postResetData(id,text))
        }
    }
    useEffect(()=>{
        if(isReset && status){
            alert(status)
            navigate("/auth/login",{replace:true})

        }

    },[isReset,status])
  return (
    <Box bg={useColorModeValue("gray.50","gray.700")} display={'flex'} justifyContent={'center'} minH={'100vh'} alignItems={'center'}>
        <Stack alignItems={'center'} spacing={4} >
            <Stack>
                <Text as={'h1'} fontSize={'2xl'}>Re-enter New password</Text>
            </Stack>
            <Stack bg={useColorModeValue("white","white.100")} spacing={6} px={8} py={8} rounded={'xl'}>
                <FormControl>
                    <FormLabel>New-Password</FormLabel>
                    <Input type='text' onChange={(e)=>setText({newPassword:e.target.value})}/>
                </FormControl>
                
                <Button bg={'teal.400'} onClick={handleReset}>{isLoading && !isReset?<Spinner/>:"Rest-Password"}</Button>
            </Stack>
        </Stack>
    </Box>
  )
}
