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
} from "@chakra-ui/react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
interface Product {
  [key: string]: any;
}

const Product = ({ data }: Product) => {
  //console.log(data);
  return (
    <Card alignItems={"flex-start"} height="450px" overflow="hidden">
      <CardHeader pb={3}>
        <Heading size="md">{data.name}</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Text>{data.description.slice(0, 150) + "..."}</Text>
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
    </Card>
  );
};

export default Product;
