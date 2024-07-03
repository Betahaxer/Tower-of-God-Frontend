import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { Box, IconButton, Icon, Progress, Heading, Text, VStack, useToast } from '@chakra-ui/react'
import { useAuth } from "../contexts/AuthContext";

// Button to click on to go to google login
export const GoogleLoginButton = () => {
    const handleClick = async () => {
        try {
            // Get Google login url from backend
            const response = await axios.get('/api/auth/google/');
            const { url } = response.data;
            
            // Redirect to google
            window.location.href = url;
        } catch (error) {
            console.error('There was a problem with the request:', error);
        }
      };
  
    return (
        <IconButton 
            aria-label="Google Login" 
            icon={<Icon as={FaGoogle}/>}
            onClick={handleClick} 
            colorScheme="blue"
            >
            Login with Google
        </IconButton>
    );
};
  
// Loading page Google redirects to after successful login
export const GoogleLoadingPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();

    useEffect(() => {
        const handleRedirect = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    // Send the google authentication code to the backend API, get jwt
                    const response = await axios.post('/api/auth/google/', { code });
                    const { access, refresh } = response.data;
                    
                    // From useAuth
                    login(access, refresh)
                    
                } catch (error) {
                    console.error('Error during authentication:', error);
                    throw new Error('Error during authentication');
                }
            } else {
                console.error('No authorization code found in URL');
                throw new Error('No authorization code found in URL');
            }
        };
        const loginPromise = handleRedirect();

        toast.promise(loginPromise, {
            success: { title: 'Login success', isClosable: true},
            error: { title: 'Login Failed', isClosable: true},
            loading: { title: 'Login pending', description: 'Please wait', isClosable: true},
        })
        setTimeout(() => {
            navigate('/');
        }, 100);
    }, [navigate, toast]);

    return (
        <VStack display="flex" alignItems="center" justifyContent="center" height="100vh">
            <Heading as='h3' size='lg'>Logging in with Google...</Heading>
            <Progress size="lg" isIndeterminate width="50%" colorScheme='pink'/>
        </VStack>
    );
}