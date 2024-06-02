import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const onSearch = async () => {
    try {
      const response = await axios.get("/1");
      setSearchResults(response.data);
      navigate("/search", { state: { results: response.data } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  return (
    <Box bg="blue.500" px={4} flexDirection={"row"} alignItems="center">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Box as="button" fontSize="20px" onClick={() => navigate("/")}>
            Choice
          </Box>
        </Link>
        <SearchBar onClick={onSearch}></SearchBar>
        <Link to="/login">Login</Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
