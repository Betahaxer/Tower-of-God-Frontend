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
  useToast,
} from "@chakra-ui/react";
import { Key, ReactElement, useEffect } from "react";
import { FaBookmark, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import Specs from "../components/Specs";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { getTokens } from "../utils/storage";

interface Dictionary {
  [key: string]: any;
}

export default function ProductDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const { checkExpiryAndRefresh } = useAuth();
  const toast = useToast();
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
  const addWishlistItem = async (product: Product): Promise<void> => {
    console.log("add: ", product);
    try {
      // add product to wishlist
      await checkExpiryAndRefresh();
      const { accessToken, refreshToken } = getTokens();
      const response = await axios.post(
        "/api/wishlist/",
        {
          product_category: product.category,
          object_id: product.id,
        },
        {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...(refreshToken && { "Refresh-Token": refreshToken }),
          },
        }
      );
      console.log(`Product with id ${product.id} added to wishlist.`);
      toast({
        title: "Added to Wishlist",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error adding wishlist item:", error);
      toast({
        title: "Item is already in wishlist",
        status: "error",
        duration: 2000,
      });
    }
  };
  return (
    <Container maxW={"7xl"}>
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
        px={{ base: 200, md: 100 }}
        direction={"column"}
      >
        <>
          <Flex justifyContent={"center"}>
            <Image
              fallbackSrc="/wiz1.svg"
              rounded={"md"}
              alt={"product image"}
              src={product.img}
              align={"center"}
              w="auto"
              h="500px"
            />
          </Flex>
          <Stack direction="row" spacing="5" justifyContent="space-between">
            <Stack spacing="0">
              <Box
                color={useColorModeValue("gray.500", "gray.600")}
                fontWeight={400}
                fontSize={"1xl"}
                m={0}
                p={0}
                textTransform={"capitalize"}
              >
                {product.category}
              </Box>
              <Box
                m={0}
                p={0}
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {product.name}
              </Box>
              <Box
                m={0}
                p={0}
                color={useColorModeValue("gray.500", "gray.600")}
                fontWeight={400}
                fontSize={"2xl"}
                mb={0}
              >
                {product.price ? "$" + product.price : "$-"}
              </Box>
            </Stack>
            <Stack direction="column" spacing="5">
              <Stack direction="row" spacing={4} alignItems="center">
                <Box
                  display="flex"
                  borderWidth="1px"
                  borderColor="black"
                  borderRadius="5"
                  h="50px"
                  minW="50px"
                  justifyContent="center"
                  alignItems="center"
                  fontWeight="500"
                  fontSize="1.5rem"
                >
                  {product.score}
                </Box>
                <Stack display="flex" direction="column" spacing={0}>
                  <Box fontWeight="600">Overall Score</Box>
                  <Box color="gray.500" maxW="30vw">
                    Based on the sentiment of the reviews and more, the product
                    is assigned a grade {"(out of 10)"}.
                  </Box>
                </Stack>
              </Stack>
              <Stack direction="row">
                <Button
                  display="flex"
                  w="100%"
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="green"
                  variant="solid"
                  justifyContent="space-between"
                  onClick={() => {
                    navigate("/compare", { state: product });
                  }}
                >
                  Compare
                </Button>
                <Button
                  display="flex"
                  w="100%"
                  rightIcon={<FaBookmark />}
                  colorScheme="green"
                  variant="solid"
                  justifyContent="space-between"
                  onClick={() => {
                    addWishlistItem(product);
                  }}
                >
                  Add to Wishlist
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </>
        <Divider borderColor={useColorModeValue("gray.200", "gray.600")} />

        <Stack spacing={{ base: 4, md: 6 }}>
          <Text
            fontSize={"lg"}
            style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}
          >
            {product.summary ? product.summary : "No description found"}
          </Text>

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
        </Stack>
      </Stack>
    </Container>
  );
}
