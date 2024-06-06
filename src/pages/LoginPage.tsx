import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Text } from "@chakra-ui/react";

import AlertCustom from "../components/AlertCustom";
import Login from "../components/Login";

import Cookies from "js-cookie";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // setAlertVisible(true);
    // if (username && password) {
    //   setLoginSuccess(true);
    // } else {
    //   setLoginSuccess(false);
    // }
    // setUsername("");
    // setPassword("");
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await axios.post("/api/login/", 
        {
          username: username,
          password: password,
        },

        {
          headers: {
            ...(accessToken && {'Authorization': `Bearer ${accessToken}`}),
            ...(refreshToken && {'Refresh-Token': refreshToken})
          }
        }
      );

      //axios.defaults.headers.common["X-CSRFToken"] = response.data.csrfToken;
      console.log(response.data);

      const { refresh, access } = response.data;

      localStorage.setItem('refreshToken', refresh)
      localStorage.setItem('accessToken', access)

      setLoginSuccess(true);
      setAlertVisible(true);
      // setUsername("");
      // setPassword("");
      // navigate("/");
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error("Error:", error);
      setLoginSuccess(false);
      setAlertVisible(true);
      // setUsername("");
      // setPassword("");
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
