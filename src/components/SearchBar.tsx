import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  onClick: () => void;
}

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState("");
  const categories = ["earbuds", "headphones", "keyboard", "laptop", "mouse"];
  let category = "";

  const onSearch = async (query: string) => {
    try {
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].includes(query)) category = categories[i];
      }
      let url = `http://127.0.0.1:8000/api/products/${category}/`;
      console.log(url);
      const response = await axios.get(url, {
        params: { search: query },
      });
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
