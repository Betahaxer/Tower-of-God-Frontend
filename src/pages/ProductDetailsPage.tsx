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

import { ArrowForwardIcon } from "@chakra-ui/icons";
import Specs from "../components/Specs";

interface Dictionary {
  [key: string]: any;
}

export default function ProductDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  if (!product || Object.keys(product).length === 0) {
    return <h1>No product found</h1>; // Prevent rendering if product is not available
  }
  console.log(product);
  interface Product {
    [key: string]: any;
  }

  const keysToRender = {
    earbuds: ["wireless", "battery_life", "active_noise_cancellation"],
    keyboard: ["wireless", "size", "key_switches"],
    laptop: [
      "battery_life",
      "screen_resolution",
      "processor",
      "os_version",
      "weight",
    ],
    mouse: ["buttons_count", "dpi", "weight", "wireless"],
    phone: [
      "battery_life",
      "screen_resolution",
      "processor",
      "os_version",
      "weight",
      "size",
    ],
    // monitor products have no category key
    monitor: ["screen_size", "screen_resolution", "refresh_rate", "panel_type"],
    speaker: ["portable", "bluetooth", "wifi", "speakerphone"],
    television: ["screen_size", "screen_resolution", "panel_type"],
  };

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
          <Flex justifyContent={"center"}>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={product.img}
              //fit={"cover"}
              align={"center"}
              //boxSize={"500px"}
              w="auto"
              h="500px"
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

            <Specs product={product} keys={keysToRender} />
          </Box>
          <Link
            to={{
              pathname: `/compare`,
            }}
            state={{ product }}
          >
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="green"
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
