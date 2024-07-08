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

  // function to listen for ENTER key and search if pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
    if (event.key === "Enter") {
      onSearch(searchResults);
    }
  };
  // handles the search logic
  const onSearch = async (query: string) => {
    try {
      let url = `/api/products/`;
      //console.log(url);
      // querying the database based on category and simple filtering with user query
      const response = await axios.get(url, {
        params: { q: query },
      });

      //console.log(response.data.results);

      // passing the data to the search results page
      navigate("/search", { state: { query } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <InputGroup maxW="45%">
      <Input
        placeholder="Search..."
        bg="white"
        _placeholder={{ color: "gray.500" }}
        value={searchResults}
        onChange={(e) => setSearchResults(e.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        borderRadius={100}
      />
      <InputRightElement>
        <Button
          bg="white.500"
          _hover={{}}
          onClick={() => onSearch(searchResults)}
          borderRadius={"full"}
          size="lg"
        >
          <SearchIcon color="black" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
