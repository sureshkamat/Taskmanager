import React from 'react';
import { Box, Flex, Spacer, Button,Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../action/userAction';
export const Navbar = () => {
    const { isAuthenticated, user } = useSelector(state => state.user);
    const dispatch=useDispatch();
  return (
    <Flex align="center" justify="space-between" p="4" bg="blue.500" color="white">
      <Box>
       <Link to='/'> <h1>Task Manager</h1></Link>
      </Box>
      <Spacer />
      {isAuthenticated?<Box>
        <Text>Welcome,{user.name}</Text>
        <Button colorScheme="white" variant="link" onClick={()=>dispatch(logout())}>Logout</Button>
      </Box>:
      <Box>
      <Link to='/login'><Button colorScheme="white" variant="link">Login</Button></Link>
    </Box>}
    </Flex>
  );
};