import { Box, Text, VStack, Stack } from "@chakra-ui/react";
import React from "react";

interface Dictionary {
  [key: string]: any;
}

export default function CompareCard({ data }: Dictionary) {
  console.log("compare card");
  console.log(data);
  return (
    <>
      <Box position="relative" w="100%">
        <VStack spacing={8} position="relative">
          <Stack position="relative" zIndex="0" w="100%" h="300px" bg="red.200">
            <Text>Parent Element (zIndex: 0)</Text>
            <Box
              position="relative"
              zIndex="2"
              w="100%"
              h="200px"
              bg="blue.200"
              top="0"
              left="0"
            >
              <Text>Child Element (zIndex: 2)</Text>
            </Box>
          </Stack>
        </VStack>
        <Box position="relative" zIndex="1" w="100%" h="200px" bg="green.200">
          <Text>Sibling Element (zIndex: 1)</Text>
        </Box>
      </Box>
    </>
  );
}
