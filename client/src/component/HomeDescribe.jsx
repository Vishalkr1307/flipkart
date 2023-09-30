import { AspectRatio, Box, Button, Container, Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import {} from "@chakra-ui/icons"
import {AiOutlinePlayCircle} from "react-icons/ai"

export const HomeDescribe = () => {
  return (
    <Container maxW={'7xl'}>
        <Stack align={'center'} spacing={{base:8,md:10}} py={{base:20,md:28}} direction={{base:"column",md:'row'}}>
            <Stack flex={1} spacing={{base:5,md:10}}>
                <Heading lineHeight={1.1} fontWeight={600} fontSize={{base:'3xl',sm:'4xl',lg:'6xl'}}>
                    <Text as={'span'} position={'relative'} _after={{
                        content:"''",
                        width:"full",
                        height:'30%',
                        position:'absolute',
                        bottom:1,
                        left:0,
                        bg:'red.400',
                        zIndex:-1


                    }}>write Once</Text>
                    <br/>
                    <Text as={'span'} color={'red.400'}>use Everywhere</Text>
                    
                </Heading>
                <Text color={'gray.400'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, deleniti. Error voluptatibus quaerat nesciunt iusto cumque, doloribus, quia totam, voluptate deleniti numquam porro id quisquam repellat natus sed a. Sint.å
                    </Text>
                <Stack>
                    <Button rounded={'full'} size={'lg'} fontWeight={'normal'} colorScheme='red' bg={'red.400'} _hover={{bg:'red.500'}} px={6}>Get Started</Button>
                    <Button rounded={'full'} size={'lg'} fontWeight={'normal'} colorScheme='black' bg={'gray.400'} _hover={{bg:'gray.500'}} leftIcon={<AiOutlinePlayCircle height={4} width={4} color='gray.50' />} >how its word</Button>
                </Stack>


            </Stack>
            <Flex flex={1} justify={'center'} align={'center'} position={'relative'} w={'full'}>
                <Box position={'relative'} height={'300px'} rounded={'2xl'} boxShadow={'2xl'} width={'full'} overflow={'hidden'}>
                    <IconButton aria-label={'Play Button'} variant={'ghost'} _hover={{bg:'transparent'}} icon={<AiOutlinePlayCircle w={12} height={12}/>} color={'white'} position={'absolute'} left={'50%'} top={'50%'} transform={'translateX(-50%) translateY(-50%)'}/>
                    <AspectRatio maxW={'560px'} ratio={1}>
                        <iframe title='youtube' src='https://www.youtube.com/watch?v=83rdkryP53w&ab_channel=WorldAffairsbyUnacademy' allowFullScreen/>
                    </AspectRatio>

                </Box>

            </Flex>

        </Stack>

    </Container>
  )
}
