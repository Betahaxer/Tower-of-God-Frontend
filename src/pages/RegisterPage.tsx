import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link, redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

import AlertCustom from "../components/AlertCustom";
import Login from "../components/Login";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const handleRegistration = async () => {
    setAlertVisible(true);
    if (username && password) {
      setRegisterSuccess(true);
    } else {
      setRegisterSuccess(false);
    }
    setUsername("");
    setPassword("");
    // try {
    //   const response = await axios.post("http://localhost:3000/login", {
    //     username,
    //     password,
    //   });

    //   if (response.status === 200) {
    //     setAlertVisible(true);
    //   } else {
    //     // Handle unsuccessful login (e.g., display error message)
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   // Handle error (e.g., display error message)
    // }
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
      {alertVisible && (
        <AlertCustom
          isSuccessful={registerSuccess}
          onClick={() => setAlertVisible(false)}
        />
      )}
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
