import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <Box p={8} textAlign="center">
      <Heading as="h1" size="2xl" mb={4}>
        Welcome to Task Manager
      </Heading>
      <Text fontSize="xl" mb={8}>
        Organize your tasks efficiently with Task Manager.
      </Text>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button as={Link} to="/login" colorScheme="blue" size="lg" mr={4}>
          Login
        </Button>
        <Button as={Link} to="/register" colorScheme="green" size="lg">
          Register
        </Button>
      </Box>
    </Box>
  );
};


