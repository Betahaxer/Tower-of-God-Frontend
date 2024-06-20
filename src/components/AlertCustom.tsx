import React, { ReactNode } from "react";
import {
  Flex,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

interface Props {
  onClick: () => void;
  isSuccessful: boolean;
  alertText: string;
}

const AlertCustom = ({ onClick, isSuccessful, alertText }: Props) => {
  const location = useLocation();
  let alertHeader = "";
  let alertBody = "";
  let type: "success" | "error" = "error";
  if (isSuccessful) {
    type = "success";
    switch (location.pathname) {
      case "/login":
        alertHeader = "Login Successful!";
        alertBody = alertText;
        break;
      case "/register":
        alertHeader = "Registration Successful!";
        alertBody = alertText;
        break;
      default:
        break;
    }
  } else {
    type = "error";
    switch (location.pathname) {
      case "/login":
        alertHeader = "Login Unsuccessful!";
        alertBody = alertText;
        break;
      case "/register":
        alertHeader = "Registration Unsuccessful!";
        alertBody = alertText;
        break;
      default:
        break;
    }
  }

  return (
    <Flex justify="center" mt="20px">
      <Alert status={type}>
        <AlertIcon />
        <Box flex="1">
          <AlertTitle>{alertHeader}</AlertTitle>
          <AlertDescription>{alertBody}</AlertDescription>
        </Box>
        <CloseButton
          alignSelf="center"
          position="relative"
          right={-1}
          onClick={onClick}
        />
      </Alert>
    </Flex>
  );
};

export default AlertCustom;
