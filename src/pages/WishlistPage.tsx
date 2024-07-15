import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Box, Button, Spinner, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getTokens } from "../utils/storage";

const WishlistPage = () => {
  const { isLoggedIn, loading } = useAuth();
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

  if (loading) {
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
      {wishlist.length !== 0 && <></>}
    </>
  );
};

export default WishlistPage;
