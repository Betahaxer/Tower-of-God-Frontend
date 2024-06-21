import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

interface Props {
  onClick: () => void;
}

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState("");
  const onSearch = async (query: string) => {
    try {
      let url = `/api/products/`;
      console.log(url);

      // querying the database based on category and simple filtering with user query
      const response = await axios.get(url, {
        params: { q: query },
      });
      console.log(response.data.results);

      // passing the data to the search results page
      navigate("/search", { state: { results: response.data.results } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <InputGroup maxW="50%">
      <Input
        placeholder="Search..."
        bg="white"
        _placeholder={{ color: "gray.500" }}
        value={searchResults}
        onChange={(e) => setSearchResults(e.target.value)}
      />
      <InputRightElement>
        <Button
          bg="teal.500"
          _hover={{ bg: "teal.600" }}
          onClick={() => onSearch(searchResults)}
        >
          <SearchIcon color="white" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
