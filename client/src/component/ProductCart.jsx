import { Badge, Box, Circle, Image,Flex, Stack, Tooltip, useColorModeValue, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, } from 'react-icons/fi'
import {BsStarFill,BsStarHalf,BsStar} from "react-icons/bs"
import {} from "@chakra-ui/icons"
const data = {
    isNew: true,
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
  }

export const ProductCart = () => {
    const bgColor=useColorModeValue('white','gray.800')
  return (
    <Flex  w='full'  alignItems={'center'} justifyContent={'center'}>
        <Stack bg={bgColor} px={8} py={4} maxW={'sm'} borderWidth={'1px '} rounded={'lg'} shadow={'lg'} position={'relative'}>
            {data.isNew && <Circle size={'10px'} position={'absolute'} top={2} right={2} bg={'red.200'}/>}
            <Image src={data.imageURL} alt={`picture of${data.name}`} rounded={'lg'}/>
            <Box>
                <Box display={'flex'} alignItems={'baseline'}>
                    {data.isNew && <Badge rounded={'full'} px={2} fontSize={'0.8em'} colorScheme='red'>New</Badge>}
                </Box>
            </Box>
            <Flex mt={1} px={8} justifyContent={'space-between'} alignItems={'center'}>
                <Box fontSize={'2xl'} fontWeight={'semibold'} lineHeight='tight' isTruncated>{data.name}</Box>
                <Tooltip label="Add to Cart" bg={'white'} placement='top' color={'gray.800'} fontSize={'1.2rem'}>
                    <Link to={'/#'}><IconButton icon={FiShoppingCart} h={7} w={7} alignSelf={'center'}/></Link>
                </Tooltip>
            </Flex>
            <Flex justifyContent={'space-between'} px={8}>
                <Rating rating={data.rating}/>
                <Box fontSize={'2xl'} color={useColorModeValue('gray.800', 'white')}>
                    <Box as='span' color={'gray.600'} fontSize={'lg'}>
                        ₹
                        

                    </Box>
                    {data.price}
                </Box>
            </Flex>
            

        </Stack>
    </Flex>
  )
}

function Rating({rating}){
    const [array,setArray]=useState(new Array(5).fill(""))
    console.log(array)

    return (
        <Box display={'flex'} alignItems={'center'}>
           {array.length && array.map((item,i)=>{
            const rountItem=Math.floor(rating*2)/2
            if(rountItem-i>=1){
                return <BsStarFill key={i} style={{ml:2}}/>
            }
            if(rountItem-i==0.5){
                return <BsStarHalf key={i} style={{ml:2}}/>
            }
            return <BsStar key={i}/>

           })}

        </Box>
    )

}
