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
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import HeartButton from "./HeartButton";
import { Link, useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
interface Product {
  [key: string]: any;
  heartFunction: () => void;
  filled: boolean;
}

const Product = ({ data, heartFunction, filled }: Product) => {
  const navigate = useNavigate();
  return (
    <Card
      position="relative"
      height="95vh"
      overflow="auto"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none", // IE and Edge
        scrollbarWidth: "none", // Firefox
      }}
    >
      <Box position="absolute" top="5" right="5">
        <HeartButton filled={filled} onClick={heartFunction}></HeartButton>
      </Box>
      <CardBody
        onClick={() => {
          navigate(`/products/${data.name}`, { state: data });
        }}
        _hover={{ cursor: "pointer" }}
      >
        <Stack direction="column" spacing={2}>
          <Flex justifyContent="center" py="8" px="8">
            <Image
              rounded={"lg"}
              alt={"Image not available"}
              src={data.img}
              h="35vh"
              w="auto"
              objectFit="contain"
              fallbackSrc="wiz1.svg"
            />
          </Flex>
          <Stack spacing="4">
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="column" spacing="0" minH="4rem">
                <Heading size="md" fontSize="1.3rem" p="0" m="0" noOfLines={2}>
                  {data.name}
                </Heading>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"xl"}
                  m={0}
                  p="0"
                >
                  {data.price ? "$" + data.price : "$-"}
                </Text>
              </Stack>
              <Box
                display="flex"
                borderWidth="1px"
                borderColor="black"
                borderRadius="5"
                h="50px"
                minW="50px"
                justifyContent="center"
                alignItems="center"
                fontWeight="500"
                fontSize="1.5rem"
                ml="5"
              >
                {data.score}
              </Box>
            </Stack>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="green"
              variant="solid"
              w="100%"
              justifyContent="space-between"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                navigate("/compare", { state: data });
              }}
            >
              Compare
            </Button>
            <Stack direction="column">
              <List spacing={1} p={0} m={0}>
                {data.pros.slice(0, 2).map((pro: string, index: number) => (
                  <ListItem key={index} fontSize={15} fontWeight="500">
                    <ListIcon as={FaPlusCircle} color="green.500" />
                    {pro}
                  </ListItem>
                ))}
                {data.cons.slice(0, 1).map((con: string, index: number) => (
                  <ListItem key={index} fontSize={15} fontWeight="500">
                    <ListIcon as={FaMinusCircle} color="red.500" />
                    {con}
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Product;
