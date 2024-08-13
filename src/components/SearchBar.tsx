import React, { useEffect, useMemo, useState } from 'react';
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
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getTokens } from '../utils/storage';
import useClickOutside from '../utils/useClickOutside';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import debounce from 'lodash.debounce';

interface Product {
  [key: string]: any;
}

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState('');
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
    if (event.key === 'Enter') {
      onSearch(searchResults);
    }
  };
  // handles the search logic
  const onSearch = async (query: string, category?: string) => {
    navigate('/search', { state: { query, category } });
  };
  const getSearchHistory = async () => {
    let allItems: Product[] = [];
    let page = 1;
    const pageSize = 12;
    let totalPages = 1;
    let offset = 0;
    try {
      await checkExpiryAndRefresh();
      const { accessToken } = getTokens();
      while (page <= totalPages) {
        const response = await axios.get(`/api/search_history/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            offset: offset,
            page: page,
            page_size: pageSize,
          },
        });
        console.log('search_history: ', response.data);
        allItems = allItems.concat(response.data.results);
        totalPages = Math.ceil(response.data.count / pageSize);
        page += 1;
        offset += pageSize;
        console.log(response.data);
      }
      setSearchHistory(allItems);
    } catch (error) {
      console.error('Error getting search history', error);
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
      console.error('Error deleting search history', error);
    }
  };
  const onDeleteAll = async (searchHistoryData: Product) => {
    try {
      await checkExpiryAndRefresh();
      const { accessToken } = getTokens();
      const deletePromises = searchHistoryData.map((item: Product) => {
        const wishlistID = item.id;
        return axios.delete(`/api/search_history/${wishlistID}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      });
      await Promise.all(deletePromises).then(async (response) => {
        console.log(response);
      });
    } catch (error) {
      console.error('Error clearing all search history', error);
    } finally {
      await getSearchHistory();
    }
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchResults(e.target.value);
    await getSearchHistory();
    setShowSearchBox(true);
  };
  const debouncedSearch = useMemo(() => {
    return debounce(handleChange, 50);
  }, []);
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  });
  useEffect(() => {
    if (location.state?.query) {
      setSearchResults(location.state?.query || '');
    }
  }, [location.state?.query]);

  return (
    <InputGroup minW="400px" maxW="45%">
      <Input
        placeholder="Search..."
        _placeholder={{ color: useColorModeValue('gray.500', 'gray.200') }}
        onChange={debouncedSearch}
        onKeyDown={(event) => handleKeyDown(event)}
        borderRadius={100}
        bg={useColorModeValue('white', 'gray.600')}
        autoComplete="off"
      />
      <InputRightElement>
        <Button
          name="search button"
          bg="none"
          onClick={() => {
            onSearch(searchResults);
            setShowSearchBox(false);
          }}
          borderRadius={'full'}
          size="lg"
          _active={{ color: 'none' }}
          _hover={{ color: 'none' }}
        >
          <SearchIcon color={useColorModeValue('black', 'white')} />
        </Button>
      </InputRightElement>
      {/* overlay search results */}
      {showSearchBox && searchHistory.length !== 0 && (
        <Box
          ref={overlayRef}
          position="absolute"
          opacity={1}
          zIndex={2}
          top="110%"
          w="100%"
          px="1"
          py="1"
          boxShadow="xl"
          borderRadius={10}
          bg={useColorModeValue('white', 'gray.600')}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Box
              px="1"
              fontWeight="400"
              fontSize="0.9rem"
              color={useColorModeValue('gray.500', 'gray.200')}
            >
              Recent Searches
            </Box>
            <Box
              px="1"
              fontWeight="400"
              fontSize="0.7rem"
              color={useColorModeValue('gray.500', 'gray.200')}
              _hover={{
                color: useColorModeValue('blue', 'blue.400'),
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={async () => {
                await onDeleteAll(searchHistory);
              }}
            >
              Clear All
            </Box>
          </Stack>
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
                    background: useColorModeValue('green.200', 'green.600'),
                  }}
                  textAlign={'left'}
                  px="2"
                  py="1"
                  onClick={() => {
                    onSearch(
                      searchHistoryResult.name,
                      searchHistoryResult.category,
                    );
                    setShowSearchBox(false);
                  }}
                  color={useColorModeValue('gray.900', 'gray.200')}
                  justifyContent="space-between"
                  alignItems="center"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  overflowX="hidden"
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="left"
                  >
                    <IoMdTime size="1.2rem" />
                    <Image
                      rounded={'md'}
                      alt={'product image'}
                      src={searchHistoryResult.img}
                      boxSize="2rem"
                      objectFit="contain"
                      fallbackSrc="/wiz1.svg"
                    />
                    <Box isTruncated fontSize="1rem" lineHeight="1.2">
                      {searchHistoryResult.name}
                    </Box>
                  </Stack>
                  <Box>
                    <IconButton
                      aria-label="Delete"
                      icon={<FaTrashAlt />}
                      size="sm"
                      position="relative"
                      bg="none"
                      _hover={{ color: 'none' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(searchHistoryItem.id);
                      }}
                      visibility={hoveredIndex === index ? 'visible' : 'hidden'}
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
