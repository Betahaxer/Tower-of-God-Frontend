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
  Tooltip,
} from "@chakra-ui/react";
import { Key, ReactElement, useEffect, useState } from "react";
import {
  FaBookmark,
  FaMinusCircle,
  FaPlusCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import Specs from "../components/Specs";
import axios, { AxiosError } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { getTokens } from "../utils/storage";
import LoadingPage from "../components/LoadingPage";

interface Dictionary {
  [key: string]: any;
}
interface ErrorResponse {
  status: number;
  data: {
    message: string;
  };
}

export default function ProductDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const { checkExpiryAndRefresh } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  if (!product || Object.keys(product).length === 0) {
    return <h1>No product found</h1>; // Prevent rendering if product is not available
  }
  console.log(product);
  interface Product {
    [key: string]: any;
  }

  const keysToRender = {
    earbuds: ["brand", "wireless", "battery_life", "active_noise_cancellation"],
    keyboard: ["brand", "wireless", "size", "key_switches"],
    laptop: [
      "brand",
      "battery_life",
      "screen_resolution",
      "processor",
      "os_version",
      "weight",
    ],
    mouse: ["brand", "buttons_count", "dpi", "weight", "wireless"],
    phone: [
      "brand",
      "battery_life",
      "screen_resolution",
      "processor",
      "os_version",
      "weight",
      "size",
    ],
    monitor: [
      "brand",
      "screen_size",
      "screen_resolution",
      "refresh_rate",
      "panel_type",
    ],
    speaker: ["brand", "portable", "bluetooth", "wifi", "speakerphone"],
    television: ["brand", "screen_size", "screen_resolution", "panel_type"],
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
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error("Error adding wishlist item:", axiosError);
      if (axiosError.response) {
        if (axiosError.response.status === 409) {
          toast({
            title: "Item is already in wishlist",
            status: "error",
            duration: 2000,
          });
        } else if (axiosError.response.status === 401) {
          toast({
            title: "Log in to add to wishlist",
            status: "error",
            duration: 2000,
          });
          navigate("/login");
        }
      } else {
        toast({
          title: "An error occurred",
          status: "error",
          duration: 2000,
        });
      }
    }
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false);
    }, 1);
  }, []);

  return (
    <>
      {loading && <LoadingPage></LoadingPage>}
      {!loading && (
        <Stack
          spacing={8}
          py={12}
          px="5rem"
          direction={"column"}
          divider={
            <Divider borderColor={useColorModeValue("gray.200", "gray.600")} />
          }
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
                h="50vh"
              />
            </Flex>
            <Stack
              direction="row"
              spacing="5"
              justifyContent="space-between"
              mt={5}
            >
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
                <Stack direction="row" alignItems="center" spacing="2">
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
                  <Tooltip
                    label="Price displayed might not be accurate"
                    placement="bottom"
                  >
                    <span>
                      <FaRegQuestionCircle
                        style={{ color: "cornflowerblue" }}
                      />
                    </span>
                  </Tooltip>
                </Stack>
              </Stack>
              <Stack direction="column" spacing="4">
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
                    <Stack direction="row" alignItems="center">
                      <Box fontWeight="600">Overall Score</Box>
                      <Tooltip
                        label={product.justification || ""}
                        placement="bottom"
                      >
                        <span>
                          <FaRegQuestionCircle
                            style={{ color: "cornflowerblue" }}
                          />
                        </span>
                      </Tooltip>
                    </Stack>
                    <Box color="gray.500" maxW="30vw">
                      Based on the sentiment of the reviews and more, the
                      product is assigned a grade {"(out of 10)"}.
                    </Box>
                  </Stack>
                </Stack>
                <Stack direction="row" display="flex">
                  <Button
                    display="flex"
                    minW="50%"
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
                    minW="50%"
                    rightIcon={<FaBookmark />}
                    colorScheme="green"
                    variant="solid"
                    justifyContent="space-between"
                    onClick={() => {
                      addWishlistItem(product);
                    }}
                    whiteSpace={"wrap"}
                    alignItems="center"
                  >
                    <Box mb={0} isTruncated>
                      Add to Wishlist
                    </Box>
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </>

          <Box>
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
          </Box>

          <Box>
            <Text
              fontSize={{ base: "16px", lg: "18px" }}
              color={useColorModeValue("yellow.500", "yellow.300")}
              fontWeight={"500"}
              textTransform={"uppercase"}
              mb={"4"}
            >
              Specifications
            </Text>

            <Specs product={product} keys={keysToRender} />
          </Box>
        </Stack>
      )}
    </>
  );
}
