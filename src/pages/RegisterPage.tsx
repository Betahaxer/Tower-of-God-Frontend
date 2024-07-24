import { useState } from "react";
import { Box, Heading, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Login from "../components/Login";
import { GoogleLoginButton } from "../components/GoogleLogin";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const handleRegistration = async () => {
    try {
      const response = await axios.post("/api/register/", {
        username: username,
        password: password,
      });
      console.log(response);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Oops...",
        description: "Please check that your details are correct.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      height="100vh"
      textAlign="center"
    >
      <Box mb={4}>
        <Login
          action="Register"
          username={username}
          password={password}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          handleLogin={handleRegistration}
        ></Login>
      </Box>
      <VStack>
          <Heading as="h4" size="md">
            Social Login:
          </Heading>
          <HStack>
            <GoogleLoginButton />
          </HStack>
      </VStack>
      <Box mt={4}>
        <Text fontSize="sm">
          Already registered?{" "}
          <Link to="/login">
            <Text as="u" color="blue.500">
              Login
            </Text>
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default RegisterPage;
