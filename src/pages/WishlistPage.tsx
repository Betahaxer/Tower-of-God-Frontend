import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Box, Button, Spinner, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { isLoggedIn, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  console.log(isLoggedIn);

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

  if (!isLoggedIn) {
    return null;
  }
  return (
    <>
      <div>WishlistPage</div>
    </>
  );
};

export default WishlistPage;
