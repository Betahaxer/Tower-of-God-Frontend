import React from "react";
import {
  Card,
  CardBody,
  Heading,
  Text,
  List,
  ListIcon,
  ListItem,
  Box,
  Flex,
  Image,
  Stack,
} from "@chakra-ui/react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import HeartButton from "./HeartButton";
import { Link } from "react-router-dom";
interface Product {
  [key: string]: any;
  heartFunction: () => void;
}

const Product = ({ data, heartFunction }: Product) => {
  return (
    <Card
      position="relative"
      height="110vh"
      overflow="auto"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none", // IE and Edge
        scrollbarWidth: "none", // Firefox
      }}
    >
      <Box position="absolute" top="5" right="5">
        <HeartButton onClick={heartFunction}></HeartButton>
      </Box>
      <Link
        to={{
          pathname: `/products/${data.name}`,
        }}
        state={data}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <CardBody pb={30}>
          <Stack direction="column" spacing={2}>
            <Flex justifyContent="center" m={0}>
              <Image
                rounded={"lg"}
                alt={"product image"}
                src={data.img}
                h="40vh"
                w="auto"
              />
            </Flex>
            <Heading size="md" m={0}>
              {data.name}
            </Heading>
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
          </Stack>
        </CardBody>
      </Link>
    </Card>
  );
};

export default Product;
