import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import AlertCustom from "../components/AlertCustom";
import Login from "../components/Login";
import { getTokens, setTokens } from "../utils/storage";
import { useAuth } from "../contexts/AuthContext";
import { GoogleLoginButton } from "../components/GoogleLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [alertText, setAlertText] = useState("");
  const { login } = useAuth();
  const handleLogin = async () => {
    const { accessToken, refreshToken } = getTokens();
    try {
      const response = await axios.post(
        "/api/login/",
        {
          username: username,
          password: password,
        },

        {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...(refreshToken && { "Refresh-Token": refreshToken }),
          },
        }
      );
      console.log(response.data);
      //setAlertText("Testing!");
      const { access, refresh } = response.data;
      login(access, refresh);
      setLoginSuccess(true);
      setAlertVisible(true);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      //setAlertText(error.response.data.error);
      setLoginSuccess(false);
      setAlertVisible(true);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
        height="100vh"
        textAlign="center"
      >
        {alertVisible && (
          <AlertCustom
            isSuccessful={loginSuccess}
            onClick={() => setAlertVisible(false)}
            alertText={alertText}
          />
        )}
        <Box mb={4}>
          <Login
            action="Login"
            username={username}
            password={password}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            handleLogin={handleLogin}
          ></Login>
        </Box>
        <VStack>
          <Heading as='h4' size='md'>Social Login:</Heading>
          <HStack>
            <GoogleLoginButton/>
          </HStack>
        </VStack>
        <Box mt={4}>
          <Text fontSize="sm">
            First time here?{" "}
            <Link to="/register">
              <Text as="u" color="blue.500">
                Register
              </Text>
            </Link>
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
