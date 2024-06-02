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
interface Props {
  productName: string;
  productDesc: string;
  buttonText: string;
  pros: string[];
  cons: string[];
}

const Product = ({
  productName,
  productDesc,
  buttonText,
  pros,
  cons,
}: Props) => {
  return (
    <Card alignItems={"flex-start"}>
      <CardHeader pb={3}>
        <Heading size="md">{productName}</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Text>{productDesc}</Text>
        <List spacing={1} p={0} m={0}>
          {pros.map((pro, index) => (
            <ListItem key={index} fontSize={15}>
              <ListIcon as={FaPlusCircle} color="green.500" />
              <b>{pro}</b>
            </ListItem>
          ))}
          {cons.map((con, index) => (
            <ListItem key={index} fontSize={15}>
              <ListIcon as={FaMinusCircle} color="red.500" />
              <b>{con}</b>
            </ListItem>
          ))}
        </List>
      </CardBody>
      <CardFooter>
        <Button>{buttonText}</Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
