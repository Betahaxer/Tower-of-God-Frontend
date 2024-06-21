import React from "react";
import ProductDetailsPage from "./ProductDetailsPage";
import {
  Card,
  CardBody,
  CardHeader,
  List,
  Heading,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import CompareCard from "../components/CompareCard";

interface Product {
  [key: string]: any;
}

interface ProductList {
  [index: number]: Product;
}
const ComparePage = (products: ProductList) => {
  return (
    <>
      <CompareCard></CompareCard>
      {/* <Box as={"header"}>
        <Text
          color={useColorModeValue("gray.900", "gray.400")}
          fontWeight={300}
          fontSize={"1xl"}
          mb={0}
          textTransform={"capitalize"}
        >
          {product.category}
        </Text>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
        >
          {product.name}
        </Heading>
        <Text
          color={useColorModeValue("gray.900", "gray.400")}
          fontWeight={300}
          fontSize={"2xl"}
          mb={0}
        >
          {product.price ? "$" + product.price : "$-"}
        </Text>
      </Box>
      <Card alignItems={"flex-start"} height="600px" overflow="hidden">
        <CardHeader pb={3}>
          <Heading size="md">Apple Vision Pro</Heading>
        </CardHeader>
        <CardBody pt={0}>
          <Text>Apple Vision Pro is the best VR googles on the market.</Text>
          <List spacing={1} p={0} m={0}>
            {data.pros.slice(0, 3).map((pro: string, index: number) => (
              <ListItem key={index} fontSize={15}>
                <ListIcon as={FaPlusCircle} color="green.500" />
                <b>{pro}</b>
              </ListItem>
            ))}
            {data.cons.slice(0, 3).map((con: string, index: number) => (
              <ListItem key={index} fontSize={15}>
                <ListIcon as={FaMinusCircle} color="red.500" />
                <b>{con}</b>
              </ListItem>
            ))}
          </List>
        </CardBody>
      </Card> */}
    </>
  );
};

export default ComparePage;
