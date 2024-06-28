import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  List,
  ListIcon,
  ListItem,
  Box,
  Flex,
  Image,
  Center,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
interface Product {
  [key: string]: any;
}

const Product = ({ data }: Product) => {
  return (
    <Card
      align="center"
      height="100vh"
      overflow="auto"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none", // IE and Edge
        "scrollbar-width": "none", // Firefox
      }}
    >
      <CardBody pb={30}>
        <Flex justifyContent="center" mb={4}>
          <Image
            rounded={"lg"}
            alt={"product image"}
            src={data.img}
            h="40vh"
            w="auto"
          />
        </Flex>
        <Heading size="md">{data.name}</Heading>
        <Text color={"gray.900"} fontWeight={300} fontSize={"xl"} m={0}>
          {data.price ? "$" + data.price : "$-"}
        </Text>
        <Text>{data.description.slice(0, 150) + "..."}</Text>

        <List spacing={1} p={0} m={0}>
          {data.pros.slice(0, 2).map((pro: string, index: number) => (
            <ListItem key={index} fontSize={15}>
              <ListIcon as={FaPlusCircle} color="green.500" />
              <b>{pro}</b>
            </ListItem>
          ))}
          {data.cons.slice(0, 1).map((con: string, index: number) => (
            <ListItem key={index} fontSize={15}>
              <ListIcon as={FaMinusCircle} color="red.500" />
              <b>{con}</b>
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
};

export default Product;
