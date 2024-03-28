import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError, register } from '../action/userAction';
import {
    Alert,
    AlertIcon,
    AlertTitle
} from '@chakra-ui/react';

export const Register = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated, error } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            password
        };

        dispatch(register(data));
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
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>

                        <Button type="submit" colorScheme="blue" width="100%" isDisabled={loading}>
                            {loading ? "Registering" : "Register"}
                        </Button>
                    </VStack>
                </form>
                {isAuthenticated && (
                    <Alert status='success'>
                        <AlertIcon />
                        <AlertTitle>Registration Successfull</AlertTitle>

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
                        Already registered? <Link to="/login">Login here</Link>
                    </p>
                </Box>
            </VStack>
        </Box>
    );
};
