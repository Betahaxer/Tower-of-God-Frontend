import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Spinner,
  Text,
  useToast,
  Image,
  Stack,
  SimpleGrid,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  AbsoluteCenter,
  Divider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getTokens } from "../utils/storage";
import SelectButton from "../components/SelectButton";
import { CiSearch } from "react-icons/ci";

import CheckButton from "../components/CheckButton";
import LoadingPage from "../components/LoadingPage";

interface Product {
  [key: string]: any;
}

const WishlistPage = () => {
  // Product id is the id unique to the product, while wishlist id is the id of that item in the wishlist
  // use wishlist id for deletion, use product id for adding
  const { isLoggedIn, loading } = useAuth();
  const [fetching, setFetching] = useState(true);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchBox, setSearchBox] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toggleSelection = (id: number) => {
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((currId) => currId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  const toast = useToast();
  const navigate = useNavigate();
  const { checkExpiryAndRefresh } = useAuth();
  const getWishlist = async () => {
    let allItems: Product[] = [];
    let page = 1;
    const pageSize = 12;
    let totalPages = 1;
    let offset = 0;
    try {
      await checkExpiryAndRefresh();
      const { accessToken } = getTokens();

      while (page <= totalPages) {
        const response = await axios.get(`/api/wishlist/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            offset: offset,
            page: page,
            page_size: pageSize,
          },
        });
        console.log("wishlist: ", response.data);
        allItems = allItems.concat(response.data.results);
        totalPages = Math.ceil(response.data.count / pageSize);
        page += 1;
        offset += pageSize;
      }
      setWishlist(allItems);
    } catch (error) {
      console.error("Request for wishlist failed", error);
    }
    setFetching(false);
  };

  const removeItems = async (ids: number[]) => {
    setFetching(true);
    try {
      await checkExpiryAndRefresh();
      const { accessToken } = getTokens();
      const deletePromises = ids.map((id) =>
        axios.delete(`/api/wishlist/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      );

      const responsePromise = Promise.all(deletePromises).then(
        async (response) => {
          console.log(response);
          const newWishlist = await getWishlist();
          return newWishlist;
        }
      );

      toast.promise(responsePromise, {
        loading: {
          title: "Deleting items...",
        },
        success: {
          title: "Items deleted",
          duration: 2000,
        },
        error: {
          title: "Error deleting items",
          duration: 2000,
        },
      });

      await responsePromise;
    } catch (error) {
      console.error("Unable to delete item from wishlist", error);
    }
    setFetching(false);
    setSelectedIds([]);
  };

  const selectAll = () => {
    const all = wishlist.map((data: Product) => data.id);
    setSelectedIds(all);
  };

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      toast({
        title: "Log in required",
        description: "Please log in to access wishlist",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login");
    }
  }, [loading, isLoggedIn]);

  useEffect(() => {
    getWishlist();
  }, []);
  if (loading || fetching) {
    return <LoadingPage />;
  }

  return (
    <>
      <Stack spacing="10" p="10" direction="column">
        <Stack direction="row">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="black"
              fontSize="1.5rem"
              h="100%"
              pl="2"
            >
              <CiSearch></CiSearch>
            </InputLeftElement>
            <Input
              position="relative"
              name="searchbox"
              value={searchBox}
              onChange={(e) => {
                setSearchBox(e.target.value);
              }}
              placeholder="Search Wishlist"
              _placeholder={{ color: "gray.600" }}
              size="lg"
              focusBorderColor="gray.200"
              _hover={{ boxShadow: "none" }}
              _focus={{ boxShadow: "none" }}
            />
          </InputGroup>
        </Stack>

        <SimpleGrid spacing={5} columns={{ base: 1, md: 2, lg: 3 }} zIndex={0}>
          {wishlist
            .filter((data: Product) =>
              data.content_object.name
                .toLowerCase()
                .includes(searchBox.toLowerCase())
            )
            .map((data: Product, index: number) => {
              const product = data.content_object;
              const isSelected = selectedIds.includes(data.id);
              return (
                <Card
                  key={index}
                  height="60vh"
                  justifyContent="center"
                  alignItems="center"
                  p="5"
                  overflow="hidden"
                  position="relative"
                  onClick={() => {
                    navigate(`/products/${product.name}`, {
                      state: product,
                    });
                  }}
                  _hover={{
                    "& > .overlay": {
                      opacity: 1,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Box
                    position="absolute"
                    display="flex"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    bg="rgba(0, 0, 0, 0.2)"
                    opacity={isSelected ? 1 : 0}
                    transition="opacity 0.3s, box-shadow 0.3s"
                    className="overlay"
                    zIndex="2"
                    justifyContent="center"
                    alignItems="center"
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      display="flex"
                      textColor="rgba(255, 255, 255, 0.6)"
                      fontWeight="1000"
                      fontSize="3rem"
                      textAlign="center"
                    >
                      More info
                    </Box>
                    <Box
                      position="absolute"
                      top="5"
                      right="5"
                      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        event.stopPropagation();
                        toggleSelection(data.id);
                      }}
                    >
                      {!isSelected && <SelectButton />}
                      {isSelected && (
                        <CheckButton
                          className="CheckButton"
                          onClick={() => {}}
                        />
                      )}
                    </Box>
                  </Box>

                  <CardBody position="relative" zIndex="1">
                    <Stack
                      direction="column"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Flex justifyContent="center">
                        <Image
                          rounded={"lg"}
                          alt={"product image"}
                          src={product.img}
                          h="40vh"
                          fallbackSrc="/wiz1.svg"
                        />
                      </Flex>
                      <Heading fontSize="20px">{product.name}</Heading>
                    </Stack>
                  </CardBody>
                </Card>
              );
            })}
        </SimpleGrid>
        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="white" px="4" fontSize="20px" color="gray.500">
            {`Displaying ${wishlist.length} products`}
          </AbsoluteCenter>
        </Box>
      </Stack>
      <Stack
        spacing="3"
        direction="row"
        alignItems="center"
        justifyContent="center"
        borderRadius={"full"}
        bg="green.400"
        position="fixed"
        bottom={selectedIds.length > 0 ? "30px" : "-100%"}
        left="50vw" // Positioning the left side of the box at 50% of the viewport width
        transform="translateX(-50%)" // translating the box left by 50% of its own width
        w="auto"
        h="auto"
        p="3"
        display="flex"
        transition="bottom 0.4s"
      >
        <Text
          mb="0"
          px="2"
          color="white"
          fontWeight="500"
          whiteSpace="nowrap"
        >{`${selectedIds.length} selected`}</Text>
        <Button
          borderRadius={"full"}
          background="green.400"
          variant="outline"
          textColor="white"
          _hover={{ background: "green.500" }}
          onClick={selectAll}
        >
          Select All
        </Button>
        <Button
          borderRadius={"full"}
          background="green.400"
          variant="outline"
          textColor="white"
          _hover={{ background: "green.500" }}
          onClick={() => {
            setSelectedIds([]);
          }}
        >
          Clear
        </Button>
        <Button
          borderRadius={"full"}
          background="green.400"
          variant="outline"
          textColor="white"
          _hover={{ background: "green.500" }}
          onClick={onOpen}
        >
          Delete
        </Button>
      </Stack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Items
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  removeItems(selectedIds);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default WishlistPage;
