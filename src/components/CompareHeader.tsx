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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface Dictionary {
  [key: string]: any;
}
export default function CompareHeader() {
  const location = useLocation();
  const product = location.state?.product;
  const [values, setValues] = useState({ value1: "", value2: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState({ value1: [], value2: [] });
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
    // console.log(response.data.results);
    //console.log(data);
  };
  const category = [
    "earbuds",
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
      console.log(selectedCategory);
    }
    if (!selectedCategory) {
    }
    console.log(selectedCategory);
  }, [selectedCategory]);

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
            <Input
              position="relative"
              name="value1"
              value={values.value1}
              onChange={(event) => handleChange(event, values.value1)}
              placeholder="Search"
              size="lg"
            />
            {values.value1 && (
              <Box
                position="absolute"
                opacity={1}
                zIndex={1}
                top="55px"
                bg="white"
                w="100%"
                px="2"
                py="2"
                boxShadow="xl"
                borderRadius={10}
              >
                <Box position="relative" zIndex={1}>
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
                        >
                          {data.name}
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            )}
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
          </Stack>
          <Stack
            w="100%"
            position="relative"
            direction="column"
            spacing={{ base: 4, md: 6 }}
          >
            <Input
              position="relative"
              name="value2"
              value={values.value2}
              onChange={(event) => handleChange(event, values.value2)}
              placeholder="Search"
              size="lg"
            />
            {values.value2 && (
              <Box
                position="absolute"
                opacity={1}
                zIndex={1}
                top="55px"
                bg="white"
                w="100%"
                px="2"
                py="2"
                boxShadow="xl"
                borderRadius={10}
              >
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
                      >
                        {data.name}
                      </Box>
                    );
                  })}
              </Box>
            )}
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
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
