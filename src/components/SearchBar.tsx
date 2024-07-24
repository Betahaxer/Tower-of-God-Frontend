import React, { useEffect, useState } from "react";
import { Input, InputGroup, InputRightElement, Button, useColorModeValue } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

interface Props {
  loading?: (isLoading: boolean) => void;
}

const SearchBar = ({ loading }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
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
    navigate("/search", { state: { query } });
  };
  useEffect(() => {
    if (location.state?.query) {
      setSearchResults(location.state?.query || "");
    }
  }, [location.state?.query]);
  return (
    <InputGroup maxW="45%">
      <Input
        placeholder="Search..."
        bg="white"
        _placeholder={{ color: "gray.600" }}
        value={searchResults}
        onChange={(e) => setSearchResults(e.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        borderRadius={100}
        color={useColorModeValue("gray.9000", "gray.600")}
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
