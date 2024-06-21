import {
  Input,
  Text,
  Select,
  Stack,
  VStack,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Dictionary {
  [key: string]: any;
}
const CompareCard = () => {
  const [values, setValues] = useState({ value1: "", value2: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState({ value1: [], value2: [] });
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
    console.log(data);
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
    console.log(selectedCategory);
  }, [selectedCategory]);
  return (
    <>
      <Stack spacing={{ base: 4, md: 6 }} marginX={100} marginY={10}>
        <Select
          placeholder="Select Category"
          value={selectedCategory}
          onChange={(event) => {
            setSelectedCategory(event.target.value);
          }}
          w="100%"
          size="lg"
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
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 4, md: 6 }}
        >
          <VStack w="100%">
            <Input
              name="value1"
              value={values.value1}
              onChange={(event) => handleChange(event, values.value1)}
              placeholder="Search"
              size="lg"
            />
            <List>
              {data.value1.map((data: Dictionary, index: number) => {
                return <ListItem>{data.name}</ListItem>;
              })}
            </List>
          </VStack>
          <VStack w="100%">
            <Input
              name="value2"
              value={values.value2}
              onChange={(event) => handleChange(event, values.value2)}
              placeholder="Search"
              size="lg"
            />
            <List>
              {data.value2.map((data: Dictionary, index: number) => {
                return <ListItem>{data.name}</ListItem>;
              })}
            </List>
          </VStack>
        </Stack>
      </Stack>
    </>
  );
};

export default CompareCard;
