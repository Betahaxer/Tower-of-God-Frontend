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
import { Key, ReactElement, useEffect } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SpecsMouse from "../components/SpecsMouse";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function ProductDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  let product = null;
  if (state?.selectedProduct2) {
    product = state.selectedProduct2;
  } else if (state?.selectedProduct) {
    product = state.selectedProduct;
  } else if (state?.product) {
    product = state.product;
  }
  //console.log("test");
  //console.log(product);

  //redirects the user if no state available, ie url is keyed in manually
  useEffect(() => {
    if (!product) {
      console.log("no product");
      //navigate("/");
    }
  }, [product, navigate]);

  if (!product) {
    return null; // Prevent rendering if product is not available
  }
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
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
        px={{ base: 200, md: 100 }}
        direction={"column"}
        divider={
          <StackDivider
            borderColor={useColorModeValue("gray.200", "gray.600")}
          />
        }
      >
        <>
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
        </>
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
          <Link
            to={{
              pathname: `/compare`,
            }}
            state={{ product }}
          >
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="outline"
              w="50%"
              maxW="180"
            >
              Compare with...
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
