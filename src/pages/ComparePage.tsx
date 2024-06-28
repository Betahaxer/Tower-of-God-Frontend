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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CompareCard from "../components/CompareCard";

interface Dictionary {
  [key: string]: any;
}
export default function ComparePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [values, setValues] = useState({ value1: "", value2: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState({ value1: [], value2: [] });

  const [selectedProduct, setSelectedProduct] = useState<Dictionary>({});
  const [selectedProduct2, setSelectedProduct2] = useState<Dictionary>({});
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showSearchBox2, setShowSearchBox2] = useState(false);

  const isInitialRender = useRef(true); //returns an object current which contains the value
  const handleChange = async (
    event: { target: { name: string; value: string } },
    query: string
  ) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    const response = await axios.get("/api/compare/", {
      params: { q: query, category: selectedCategory },
    });
    setData({ ...data, [name]: response.data.results });
  };
  const category = [
    "earphone",
    "keyboard",
    "laptop",
    "mouse",
    "phone",
    "monitor",
    "speaker",
    "television",
  ];
  useEffect(() => {
    if (isInitialRender.current && product) {
      setSelectedCategory(product.category);
      isInitialRender.current = false;
    }
    if (product) {
      setSelectedProduct(product);
    }
    console.log(selectedCategory);
    console.log(selectedProduct);
    console.log(selectedProduct2);
  }, [selectedCategory, selectedProduct, selectedProduct2]);

  return (
    <>
      <Stack
        position="relative"
        spacing={{ base: 4, md: 6 }}
        marginX={100}
        marginY={10}
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
            {selectedCategory && (
              <Input
                position="relative"
                name="value1"
                value={values.value1}
                onChange={(event) => {
                  handleChange(event, values.value1);
                  setShowSearchBox(true);
                }}
                placeholder="Search"
                size="lg"
              />
            )}
            {showSearchBox && (
              <Box
                position="absolute"
                opacity={1}
                zIndex={2}
                top="55px"
                bg="white"
                w="100%"
                px="2"
                py="2"
                boxShadow="xl"
                borderRadius={10}
              >
                <Box position="relative">
                  {data.value1
                    .slice(0, 5)
                    .map((data: Dictionary, index: number) => {
                      return (
                        <Box
                          key={index}
                          h="100px"
                          borderRadius={10}
                          _hover={{
                            background: "yellow.200",
                          }}
                          textAlign={"left"}
                          px="5"
                          py="2"
                          onClick={() => {
                            setSelectedProduct(data);
                            setShowSearchBox(false);
                          }}
                        >
                          {data.name}
                        </Box>
                      );
                    })}
                </Box>
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
                h="500"
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
                    state: { selectedProduct },
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
            {selectedCategory && (
              <Input
                position="relative"
                name="value2"
                value={values.value2}
                onChange={(event) => {
                  handleChange(event, values.value2);
                  setShowSearchBox2(true);
                }}
                placeholder="Search"
                size="lg"
              />
            )}
            {showSearchBox2 && (
              <Box
                position="absolute"
                opacity={1}
                zIndex={2}
                top="55px"
                bg="white"
                w="100%"
                px="2"
                py="2"
                boxShadow="xl"
                borderRadius={10}
              >
                <Box position="relative">
                  {data.value2
                    .slice(0, 5)
                    .map((data: Dictionary, index: number) => {
                      return (
                        <Box
                          key={index}
                          h="100px"
                          borderRadius={10}
                          _hover={{
                            background: "yellow.200",
                          }}
                          textAlign={"left"}
                          px="5"
                          py="2"
                          onClick={() => {
                            setSelectedProduct2(data);
                            setShowSearchBox2(false);
                          }}
                        >
                          {data.name}
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
                h="500"
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
                    state: { selectedProduct2 },
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
