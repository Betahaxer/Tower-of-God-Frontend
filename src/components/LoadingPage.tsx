import { Box, Spinner } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Spinner width="20vh" height="20vh" />
    </Box>
  );
};

export default LoadingPage;
