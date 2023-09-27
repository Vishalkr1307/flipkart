import { Box, Checkbox,Text, CheckboxGroup, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const SideBar = () => {
    const [serchparam,setSerchParam]=useSearchParams()
    const [category,setCategory]=useState(serchparam.getAll("category")||[])
    const handleCategory=(val)=>{
        setCategory(val)

    }
    useEffect(()=>{
        if(category){
            setSerchParam({category: category})
        }

    },[category,setSerchParam])
  return (
    <Box >
        <Stack minH={'100vh'} display={{md:"block"}} px={6} spacing={6}>
            <Box height={'30vh'}>
                <Text fontSize={'2xl'}>Filter</Text>
            </Box>
            <Box>
                <Stack>
                <Text fontSize={'2xl'}>Category</Text>

                    <CheckboxGroup colorScheme='green' defaultValue={category} onChange={handleCategory}>
                        <Checkbox value="men's clothing">Men's clothing</Checkbox>
                        <Checkbox value="women's clothing">Women's clothing</Checkbox>
                        <Checkbox value="jewelery">jewelery</Checkbox>
                        <Checkbox value="electronices">electronices</Checkbox>
                        <Checkbox value="bags">bags</Checkbox>
                    </CheckboxGroup>
                </Stack>
            </Box>
            
        </Stack>
    </Box>
  )
}
