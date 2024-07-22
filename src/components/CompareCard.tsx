import {
  Box,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
  Flex,
  Image,
  Heading,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Card,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import Specs from "./Specs";
import { Laptop } from "@mui/icons-material";

interface Dictionary {
  [key: string]: any;
}

export default function CompareCard({ product }: Dictionary) {
  console.log(product);
  interface Product {
    [key: string]: any;
  }
  const keysToRender = {
    earbuds: ["wireless", "battery_life", "active_noise_cancellation"],
    keyboard: ["wireless", "size", "key_switches"],
    laptop: [
      "battery_life",
      "screen_resolution",
      "processor",
      "os_version",
      "weight",
    ],
    mouse: ["buttons_count", "dpi", "weight", "wireless"],
    phone: [
      "battery_life",
      "screen_resolution",
      "processor",
      "os_version",
      "weight",
      "size",
    ],
    // monitor products have no category key
    monitor: ["screen_size", "screen_resolution", "refresh_rate", "panel_type"],
    speaker: ["portable", "bluetooth", "wifi", "speakerphone"],
    television: ["screen_size", "screen_resolution", "panel_type"],
  };

  return (
    <>
      <Card>
        <Stack
          spacing={{ base: 8, md: 10 }}
          py={{ base: 9, md: 12 }}
          px={{ base: 20, md: 10 }}
          direction={"column"}
          justifyItems="center"
          alignItems="center"
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.200", "gray.600")}
            />
          }
        >
          <>
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={product.img}
                fit={"cover"}
                align={"center"}
                w="auto"
                h="35vh"
                fallbackSrc="wiz1.svg"
              />
            </Flex>
            <Box as={"header"}>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"1xl"}
                mb={0}
                textTransform={"capitalize"}
              >
                {product.category || "\u00A0"}
              </Text>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                noOfLines={2}
                height={"2.2em"}
              >
                {product.name}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
                mb={0}
              >
                {product.price ? "$" + product.price : "$---"}
              </Text>
            </Box>
          </>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={5}
            height="300"
            overflowY="auto"
            // hide the scroll bar
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none", // IE and Edge
              scrollbarWidth: "none", // Firefox
            }}
          >
            <List spacing={2}>
              {product.pros.slice(0, 5).map((pros: string, index: number) => {
                return (
                  <ListItem key={index} fontSize={15}>
                    <ListIcon as={FaPlusCircle} color="green.500" />
                    <b>{pros}</b>
                  </ListItem>
                );
              })}
            </List>
            <List spacing={2}>
              {product.cons.slice(0, 5).map((cons: string, index: number) => {
                return (
                  <ListItem key={index} fontSize={15}>
                    <ListIcon as={FaMinusCircle} color="red.500" />
                    <b>{cons}</b>
                  </ListItem>
                );
              })}
            </List>
          </SimpleGrid>
          <Box overflow="auto" height="300" width="100%">
            <Text
              fontSize={{ base: "16px", lg: "18px" }}
              color={useColorModeValue("yellow.500", "yellow.300")}
              fontWeight={"500"}
              textTransform={"uppercase"}
              mb={"4"}
            >
              Product Details
            </Text>
            {/*rendering of product details*/}
            <Specs product={product} keys={keysToRender} />
          </Box>
        </Stack>
      </Card>
    </>
  );
}
