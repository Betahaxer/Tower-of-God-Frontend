import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import LoadingPage from "../components/LoadingPage";

function HomePage() {
  return (
    <>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 10, md: 20 }}
        maxH={100}
      >
        <Heading
          fontWeight={1000}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Be an <br />
          <Text as={"span"} color={"green.400"}>
            informed consumer
          </Text>
        </Heading>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="start"
          mt="30px"
          height="100vh"
        >
          <SearchBar />
        </Box>
      </Stack>
    </>
  );
}

export default HomePage;
