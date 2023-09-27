import { Avatar, Box, Button, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {AddIcon, CloseIcon, HamburgerIcon} from "@chakra-ui/icons"
import { useNavigate } from 'react-router-dom'
import { SideBar } from './SideBar'

export const Navbar = () => {
  const bgColor=useColorModeValue("gray.50","gray.700")
  const {isOpen,onOpen,onClose}=useDisclosure()
  const navigate=useNavigate()
  return (
    <Box bg={bgColor} px={4}>
      <Stack h={16} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <IconButton size={'md'} icon={isOpen?<CloseIcon/>:<HamburgerIcon/>} display={{md:"none"}} onClick={isOpen?onClose:onOpen}/>
        <Box>logo</Box>
        <Box>
          <Input type='text'/>
      
        </Box>
        <Box>
          <Button variant={'solid'} onClick={()=>navigate("/auth/login")} colorScheme='teal' size={'sm'} mr={4} leftIcon={<AddIcon/>}>Login</Button>
        </Box>
        <Menu>
          <MenuButton as={'button'} rounded={'full'}  cursor={'pointer'} ><Avatar src='' size={'sm'}/></MenuButton>
          <MenuList>
            <MenuItem>1</MenuItem>
            <MenuItem>1</MenuItem>
            <MenuItem>1</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
      {/* <Stack border={'1px solid red'} maxW={'150px'} height={'100vh'} display={{md:'none'}}>
        {isOpen?<SideBar/>:null}
      // </Stack> */}
    </Box>
  )
}
