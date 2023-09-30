import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getProductData } from '../redux/app/action'
import { useSearchParams } from 'react-router-dom'
import {Box, Stack,Text} from "@chakra-ui/react"
import { ProductCart } from '../component/ProductCart'
export const Home = () => {
  const {loading,error,product}=useSelector((store)=>store.app)
  const dispatch=useDispatch()
  const [serchParam]=useSearchParams()
  const data=serchParam.getAll("category")
  useEffect(()=>{
    if(product.length==0){

      dispatch(getProductData(data))
    }
    

  },[product,dispatch,serchParam])
 
  return (
    <Box  width={'80%'} minH={'100vh'}>
     
      <Stack  display={'flex'} width={'98%'} direction={'row'} flexWrap={'wrap'} justify={'space-around'} >
        {product.length>0 && product.map((item)=><ProductCart key={item._id} {...item}/>)}
      </Stack>
    </Box>
  )
}
