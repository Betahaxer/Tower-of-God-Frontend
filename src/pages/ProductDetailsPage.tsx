"use client";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { Key, ReactElement } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import SpecsMouse from "../components/SpecsMouse";

export default function ProductDetailsPage() {
  const location = useLocation();
  const product = location.state.product;
  console.log(product);

  interface Product {
    [key: string]: any;
  }
  // categoryMap type is a dictionary which has string as the key and a function which
  // passes a prop to the component when called
  interface categoryMap {
    [category: string]: (props: Product) => ReactElement;
  }
  // mapping of the product category to the corresponding component
  // since each category will have different specifications
  const categoryMap: categoryMap = {
    mouse: (props) => <SpecsMouse {...props} />,
  };
  const placeholder = () => (
    <List>
      <ListItem>Details not available, sorry!</ListItem>
    </List>
  );
  const specComponent = categoryMap[product.category] || placeholder;

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={
              "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080"
            }
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack
          spacing={{ base: 4, md: 6 }}
          direction={"column"}
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.200", "gray.600")}
            />
          }
        >
          <Box as={"header"}>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"1xl"}
              mb={0}
              textTransform={"capitalize"}
            >
              {product.category}
            </Text>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
              mb={0}
            >
              {product.price ? "$" + product.price : "$-"}
            </Text>
          </Box>
          <Stack spacing={{ base: 4, md: 6 }}>
            <VStack spacing={{ base: 4, sm: 6 }}>
              {/* <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </Text> */}
              <Text
                fontSize={"lg"}
                style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}
              >
                {product.description
                  ? product.description.slice(0, 1000) + "..."
                  : "No description found"}
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <List spacing={2}>
                {product.pros.slice(0, 5).map((pros: string, index: number) => {
                  return (
                    <ListItem key={index} fontSize={15}>
                      <ListIcon as={FaPlusCircle} color="green.500" />
                      <b>{pros}</b>
                    </ListItem>
                  );
                })}
              </List>
              <List spacing={2}>
                {product.cons.slice(0, 5).map((cons: string, index: number) => {
                  return (
                    <ListItem key={index} fontSize={15}>
                      <ListIcon as={FaMinusCircle} color="red.500" />
                      <b>{cons}</b>
                    </ListItem>
                  );
                })}
              </List>
            </SimpleGrid>

            <Divider borderColor={useColorModeValue("gray.200", "gray.600")} />

            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              {specComponent(product)}
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
