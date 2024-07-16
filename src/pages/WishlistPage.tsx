import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Spinner,
  Text,
  useToast,
  Image,
  Stack,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getTokens } from "../utils/storage";
import HeartButton from "../components/HeartButton";
import RemoveButton from "../components/RemoveButton";

interface Product {
  [key: string]: any;
}

const WishlistPage = () => {
  const { isLoggedIn, loading } = useAuth();
  const [fetching, setFetching] = useState(true);
  const [wishlist, setWishlist] = useState<[]>([]);
  const toast = useToast();
  const navigate = useNavigate();
  //console.log(isLoggedIn);
  const getWishlist = async () => {
    try {
      const { accessToken } = getTokens();
      const response = await axios.get("/api/wishlist/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setWishlist(response.data.results);
    } catch (error) {
      console.error("Request for wishlist failed", error);
    }
    setFetching(false);
  };
  const removeItem = async (id: number) => {
    try {
      const { accessToken } = getTokens();
      const response = await axios.delete(`/api/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response);
      const newWishlist = await getWishlist();
    } catch (error) {
      console.error("Unable to delete item from wishlist", error);
    }
    setFetching(false);
  };

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      toast({
        title: "Log in required",
        description: "Please log in to access wishlist",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    }
  }, [loading, isLoggedIn]);

  useEffect(() => {
    getWishlist();
  }, []);

  if (loading || fetching) {
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
  }

  return (
    <>
      <div>WishlistPage</div>
      {wishlist.length === 0 && <div>Your wishlist is empty!</div>}
      {wishlist.length !== 0 && (
        <>
          <SimpleGrid spacing={4} columns={{ base: 1, md: 2, lg: 3 }} p="10">
            {wishlist.map((data: Product, index: number) => {
              console.log(data);
              const product = data.content_object;
              return (
                <Card
                  key={index}
                  height="60vh"
                  justifyContent="center"
                  alignItems="center"
                  p="5"
                  overflow="auto"
                >
                  <Box position="absolute" top="5" right="5">
                    <RemoveButton
                      onClick={() => {
                        removeItem(data.id);
                        // this id is the id of the product in the wishlist, not the unique product id itself
                      }}
                    />
                  </Box>
                  <CardBody>
                    <Stack
                      direction="column"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Flex justifyContent="center">
                        <Image
                          rounded={"lg"}
                          alt={"product image"}
                          src={product.img}
                          h="40vh"
                        />
                      </Flex>
                      <Heading fontSize="20px">{product.name}</Heading>
                    </Stack>
                  </CardBody>
                </Card>
              );
            })}
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default WishlistPage;
