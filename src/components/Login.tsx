import React from "react";
import { Flex, Heading, VStack, Input, Button, Alert } from "@chakra-ui/react";

interface Props {
  username: string;
  password: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
  action: string;
}
const Login = ({
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  handleLogin,
  action,
}: Props) => {
  return (
    <>
      <Flex justify="center" mt="50px">
        <Heading fontSize="45px" fontWeight="bold">
          {action}
        </Heading>
      </Flex>
      <Flex justify="center" paddingTop="50px">
        <VStack spacing={4} width="500px">
          <Input
            placeholder="Enter your email"
            size="lg"
            value={username}
            onChange={onUsernameChange}
          />
          <Input
            placeholder="Create a password"
            type="password"
            size="lg"
            value={password}
            onChange={onPasswordChange}
          />
          <Button colorScheme="green" size="lg" onClick={handleLogin}>
            {action}
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

export default Login;
