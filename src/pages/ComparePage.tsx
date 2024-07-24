import {
  Input,
  Text,
  Select,
  Stack,
  VStack,
  Box,
  List,
  ListItem,
  slideFadeConfig,
  Card,
  Popover,
  Link,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CompareCard from "../components/CompareCard";
import useClickOutside from "../utils/useClickOutside";
import debounce from "lodash.debounce";

interface Dictionary {
  [key: string]: any;
}
export default function ComparePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location?.state;
  const [values, setValues] = useState({ value1: "", value2: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState({ value1: [], value2: [] });

  const [selectedProduct, setSelectedProduct] = useState<Dictionary>({});
  const [selectedProduct2, setSelectedProduct2] = useState<Dictionary>({});
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showSearchBox2, setShowSearchBox2] = useState(false);

  const isInitialRender = useRef(true); //returns an object current which contains the value
  const overlayRef = useClickOutside(() => {
    setShowSearchBox(false);
  });
  const overlayRef2 = useClickOutside(() => {
    setShowSearchBox2(false);
  });
  const category = [
    "earphones",
    "keyboard",
    "laptop",
    "mouse",
    "phone",
    "monitor",
    "speaker",
    "television",
  ];
  const getProducts = async (
    event: { target: { name: string; value: string } },
    query: string
  ) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    try {
      console.log("category: " + selectedCategory);
      const response = await axios.get("/api/compare/", {
        params: { q: query, category: selectedCategory },
      });
      setData({ ...data, [name]: response.data.results });
    } catch (error) {
      console.error("Error getting products", error);
    }
  };
  const handleChangeLeft = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await getProducts(event, event.target.value);
    setShowSearchBox(true);
  };
  const handleChangeRight = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await getProducts(event, event.target.value);
    setShowSearchBox2(true);
  };
  const debouncedSearchLeft = useMemo(() => {
    return debounce(handleChangeLeft, 200);
  }, [selectedCategory]);
  const debouncedSearchRight = useMemo(() => {
    return debounce(handleChangeRight, 200);
  }, [selectedCategory]);
  useEffect(() => {
    return () => {
      debouncedSearchLeft.cancel();
    };
  });
  useEffect(() => {
    return () => {
      debouncedSearchRight.cancel();
    };
  });
  useEffect(() => {
    if (isInitialRender.current && product) {
      setSelectedCategory(product.category);
      setSelectedProduct(product);
      isInitialRender.current = false;
    }
  }, [selectedCategory, selectedProduct, selectedProduct2]);

  return (
    <>
      <Stack
        position="relative"
        spacing={{ base: 4, md: 6 }}
        marginX={100}
        marginY={10}
        zIndex={0}
      >
        <Select
          position="relative"
          zIndex={1}
          placeholder="Select Category"
          value={selectedCategory}
          onChange={(event) => {
            setSelectedCategory(event.target.value);
          }}
          w="100%"
          size="lg"
          isRequired={true}
        >
          {category.map((category: string, index: number) => {
            return (
              <option value={category} key={index}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            );
          })}
        </Select>

        <Stack
          position="relative"
          direction="row"
          spacing={{ base: 4, md: 6 }}
          zIndex={1}
        >
          <Stack
            w="100%"
            position="relative"
            direction="column"
            spacing={{ base: 4, md: 6 }}
          >
            <Input
              color={useColorModeValue("gray.900", "gray.300")}
              position="relative"
              name="value1"
              //value={values.value1}
              onChange={debouncedSearchLeft}
              isDisabled={!selectedCategory}
              placeholder="Search"
              size="lg"
            />
            {showSearchBox && (
              <Box
                ref={overlayRef}
                position="absolute"
                opacity={1}
                zIndex={2}
                top="55px"
                w="100%"
                px="2"
                py="2"
                boxShadow="xl"
                borderRadius={10}
                bg={useColorModeValue("white", "gray.600")}
              >
                {data.value1
                  .slice(0, 5)
                  .map((data: Dictionary, index: number) => {
                    return (
                      <Box
                        key={index}
                        h="10vh"
                        borderRadius={10}
                        _hover={{
                          background: useColorModeValue(
                            "green.200",
                            "green.600"
                          ),
                        }}
                        // textAlign={"left"}
                        px="5"
                        py="2"
                        onClick={() => {
                          setSelectedProduct(data);
                          setShowSearchBox(false);
                        }}
                        color={useColorModeValue("gray.900", "gray.200")}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="left"
                          w="100%"
                          h="100%"
                        >
                          <Image
                            rounded={"md"}
                            alt={"product image"}
                            src={data.img}
                            boxSize="8vh"
                            objectFit="contain"
                            fallbackSrc="/wiz1.svg"
                          />
                          <Box isTruncated>{data.name}</Box>
                        </Stack>
                      </Box>
                    );
                  })}
              </Box>
            )}
            {Object.keys(selectedProduct).length === 0 && (
              <Card
                position="absolute"
                zIndex={0}
                top="70px"
                bg="gray.200"
                p="4"
                textAlign="center"
                w="100%"
                borderRadius="20"
                display="flex"
                justifyContent="center"
                alignItems="center"
                h="50vh"
              >
                <Text px="10" fontSize="50" color="gray.500">
                  Product 1
                </Text>
              </Card>
            )}
            {Object.keys(selectedProduct).length !== 0 && (
              <Box
                position="absolute"
                top="70px"
                zIndex={1}
                pb={100}
                onClick={() => {
                  console.log(selectedProduct);
                  navigate(`/products/${selectedProduct.name || ""}`, {
                    state: selectedProduct,
                  });
                }}
              >
                <CompareCard product={selectedProduct}></CompareCard>
              </Box>
            )}
          </Stack>
          <Stack
            w="100%"
            position="relative"
            direction="column"
            spacing={{ base: 4, md: 6 }}
          >
            <Input
              color={useColorModeValue("gray.900", "gray.300")}
              position="relative"
              name="value2"
              //value={values.value2}
              onChange={debouncedSearchRight}
              isDisabled={!selectedCategory}
              placeholder="Search"
              size="lg"
            />
            {showSearchBox2 && (
              <Box
                ref={overlayRef2}
                position="absolute"
                opacity={1}
                zIndex={2}
                top="55px"
                w="100%"
                px="2"
                py="2"
                boxShadow="xl"
                borderRadius={10}
                bg={useColorModeValue("white", "gray.600")}
              >
                <Box position="relative">
                  {data.value2
                    .slice(0, 5)
                    .map((data: Dictionary, index: number) => {
                      return (
                        <Box
                          key={index}
                          h="10vh"
                          borderRadius={10}
                          _hover={{
                            background: useColorModeValue(
                              "green.200",
                              "green.600"
                            ),
                          }}
                          //textAlign={"left"}
                          px="5"
                          py="1"
                          onClick={() => {
                            setSelectedProduct2(data);
                            setShowSearchBox2(false);
                          }}
                          color={useColorModeValue("gray.900", "gray.200")}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="left"
                            w="100%"
                            h="100%"
                          >
                            <Image
                              rounded={"md"}
                              alt={"product image"}
                              src={data.img}
                              boxSize="8vh"
                              objectFit="contain"
                              fallbackSrc="/wiz1.svg"
                            />
                            <Box isTruncated>{data.name}</Box>
                          </Stack>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            )}
            {Object.keys(selectedProduct2).length === 0 && (
              <Card
                position="absolute"
                zIndex={0}
                top="70px"
                bg="gray.200"
                p="4"
                textAlign="center"
                w="100%"
                borderRadius="20"
                display="flex"
                justifyContent="center"
                alignItems="center"
                h="50vh"
              >
                <Text px="10" fontSize="50" color="gray.500">
                  Product 2
                </Text>
              </Card>
            )}
            {Object.keys(selectedProduct2).length !== 0 && (
              <Box
                position="absolute"
                top="70px"
                zIndex={1}
                onClick={() => {
                  console.log(selectedProduct2);
                  navigate(`/products/${selectedProduct2.name || ""}`, {
                    state: selectedProduct2,
                  });
                }}
              >
                <CompareCard product={selectedProduct2}></CompareCard>
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
