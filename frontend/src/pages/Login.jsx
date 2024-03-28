import {
  Alert,
  AlertIcon,
  AlertTitle, Box, Button, FormControl, FormLabel, Input, VStack
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearError, login } from '../action/userAction';

export const Login = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(useSelector(state=>state));
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    const data = {
      email,
      password
    };
    dispatch(login(data));
  };
  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(clearError());
      }, 5000); // Set the duration here (in milliseconds)
    }
    if (isAuthenticated) {
      navigate('/task');
    }
    return () => clearTimeout(timeout);

  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <Box p={4}>
      <VStack spacing={4} maxW="md" mx="auto">
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4} align="stretch">
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="100%" isDisabled={loading}>
              {loading?"Logging":"Login"}
            </Button>
          </VStack>
        </form>
        {isAuthenticated && (
          <Alert status='success'>
            <AlertIcon />
            <AlertTitle>Login Successfull</AlertTitle>

          </Alert>
        )}
        {error && (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>

          </Alert>
        )}
        <Box>
          <p>
            Not registered yet? <Link to="/register">Register here</Link>
          </p>
        </Box>
      </VStack>
    </Box>
  );
};


