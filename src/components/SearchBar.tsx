import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorModeValue,
  Box,
  Stack,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { useAuth } from "../contexts/AuthContext";
import { getTokens } from "../utils/storage";
import useClickOutside from "../utils/useClickOutside";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  loading?: (isLoading: boolean) => void;
}

interface Product {
  [key: string]: any;
}

const SearchBar = ({ loading }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchHistory, setSearchHistory] = useState<Product[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { checkExpiryAndRefresh } = useAuth();
  // custom hook to close overlay if user clicks outside
  const overlayRef = useClickOutside(() => {
    setShowSearchBox(false);
  });

  // function to listen for ENTER key and search if pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
    if (event.key === "Enter") {
      onSearch(searchResults);
    }
  };
  // handles the search logic
  const onSearch = async (query: string, category?: string) => {
    navigate("/search", { state: { query, category } });
  };
  const getSearchHistory = async () => {
    try {
      await checkExpiryAndRefresh();
      const { accessToken } = getTokens();
      const response = await axios.get("/api/search_history/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data.results);
      setSearchHistory(response.data.results);
    } catch (error) {
      console.error("Error getting search history", error);
    }
  };
  const onDelete = async (wishlistID: number) => {
    try {
      await checkExpiryAndRefresh();
      const { accessToken } = getTokens();
      const response = await axios.delete(`/api/search_history/${wishlistID}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data);
      await getSearchHistory();
    } catch (error) {
      console.error("Error deleting search history", error);
    }
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
        _placeholder={{ color: useColorModeValue("gray.500", "gray.200") }}
        value={searchResults}
        onChange={async (e) => {
          setSearchResults(e.target.value);
          await getSearchHistory();
          setShowSearchBox(true);
        }}
        onKeyDown={(event) => handleKeyDown(event)}
        borderRadius={100}
        bg={useColorModeValue("white", "gray.600")}
      />
      <InputRightElement>
        <Button
          bg="none"
          onClick={() => {
            onSearch(searchResults);
            setShowSearchBox(false);
          }}
          borderRadius={"full"}
          size="lg"
        >
          <SearchIcon color={useColorModeValue("black", "white")} />
        </Button>
      </InputRightElement>
      {showSearchBox && searchHistory.length !== 0 && (
        <Box
          ref={overlayRef}
          position="absolute"
          opacity={1}
          zIndex={2}
          top="110%"
          w="100%"
          px="2"
          py="2"
          boxShadow="xl"
          borderRadius={10}
          bg={useColorModeValue("white", "gray.600")}
        >
          {searchHistory
            .slice(0, 5)
            .map((searchHistoryItem: Product, index: number) => {
              const searchHistoryResult = searchHistoryItem.content_object;
              return (
                <Stack
                  key={index}
                  direction="row"
                  h="12vh"
                  borderRadius={10}
                  _hover={{
                    background: useColorModeValue("green.200", "green.600"),
                  }}
                  textAlign={"left"}
                  px="5"
                  py="2"
                  onClick={() => {
                    onSearch(
                      searchHistoryResult.name,
                      searchHistoryResult.category
                    );
                    setShowSearchBox(false);
                  }}
                  color={useColorModeValue("gray.900", "gray.200")}
                  justifyContent="space-between"
                  alignItems="center"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="left"
                  >
                    <Image
                      rounded={"md"}
                      alt={"product image"}
                      src={searchHistoryResult.img}
                      boxSize="8vh"
                      objectFit="contain"
                      fallbackSrc="/wiz1.svg"
                    />
                    <Box>{searchHistoryResult.name}</Box>
                  </Stack>
                  <Box>
                    <IconButton
                      aria-label="Delete"
                      icon={<FaTrashAlt />}
                      size="sm"
                      position="relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(searchHistoryItem.id);
                      }}
                      visibility={hoveredIndex === index ? "visible" : "hidden"}
                    />
                  </Box>
                </Stack>
              );
            })}
        </Box>
      )}
    </InputGroup>
  );
};

export default SearchBar;
