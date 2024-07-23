import React from "react";
import {
  Card,
  CardBody,
  Heading,
  Text,
  List,
  ListIcon,
  ListItem,
  Box,
  Flex,
  Image,
  Stack,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import HeartButton from "./HeartButton";
import { Link, useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { getTokens } from "../utils/storage";

interface Product {
  [key: string]: any;
}

interface Props {
  productData: Product;
  heartFunction: () => void;
  filled: boolean;
}

const Product = ({ productData, heartFunction, filled }: Props) => {
  const navigate = useNavigate();
  const { checkExpiryAndRefresh } = useAuth();
  const addSearchHistory = async (product: Product) => {
    try {
      await checkExpiryAndRefresh();
      const { accessToken, refreshToken } = getTokens();
      const response = await axios.post(
        "/api/search_history/",
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
      console.log(response);
    } catch (error) {
      console.error("Unable to add to search history", error);
    }
  };
  return (
    <Card
      position="relative"
      height="105vh"
      overflow="auto"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none", // IE and Edge
        scrollbarWidth: "none", // Firefox
      }}
    >
      <Box position="absolute" top="5" right="5">
        <HeartButton filled={filled} onClick={heartFunction}></HeartButton>
      </Box>
      <CardBody
        onClick={() => {
          navigate(`/products/${productData.name}`, { state: productData });
          addSearchHistory(productData);
        }}
        _hover={{ cursor: "pointer" }}
      >
        <Stack direction="column" spacing={2}>
          <Flex justifyContent="center" py="8" px="8">
            <Image
              rounded={"lg"}
              alt={"Image not available"}
              src={productData.img}
              h="35vh"
              w="auto"
              objectFit="contain"
              fallbackSrc="/wiz1.svg"
            />
          </Flex>
          <Stack spacing="4">
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="column" spacing="0" minH="4rem">
                <Heading size="md" fontSize="1.3rem" p="0" m="0" noOfLines={2}>
                  {productData.name}
                </Heading>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"xl"}
                  m={0}
                  p="0"
                >
                  {productData.price ? "$" + productData.price : "$-"}
                </Text>
              </Stack>
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
                ml="5"
              >
                {productData.score}
              </Box>
            </Stack>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="green"
              variant="solid"
              w="100%"
              justifyContent="space-between"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                navigate("/compare", { state: productData });
              }}
            >
              Compare
            </Button>
            <Stack direction="column">
              <List spacing={1} p={0} m={0}>
                {productData.pros
                  .slice(0, 2)
                  .map((pro: string, index: number) => (
                    <ListItem key={index} fontSize={15} fontWeight="500">
                      <ListIcon as={FaPlusCircle} color="green.500" />
                      {pro}
                    </ListItem>
                  ))}
                {productData.cons
                  .slice(0, 1)
                  .map((con: string, index: number) => (
                    <ListItem key={index} fontSize={15} fontWeight="500">
                      <ListIcon as={FaMinusCircle} color="red.500" />
                      {con}
                    </ListItem>
                  ))}
              </List>
            </Stack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Product;
