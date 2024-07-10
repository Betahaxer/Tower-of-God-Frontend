import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { isLoggedIn } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Log in required",
        description: "Please log in to access wishlist",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      navigate("/login");
    }
  }, [isLoggedIn, toast]);

  if (!isLoggedIn) {
    return null;
  }
  return (
    <>
      <Button
        onClick={() => {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }}
      >
        Show Toast
      </Button>
      <div>WishlistPage</div>
    </>
  );
};

export default WishlistPage;
