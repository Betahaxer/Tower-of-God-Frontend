import { Key, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  SimpleGrid,
  Heading,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import Product from "../components/Product";
import WithSubnavigation from "../components/NavBarTemplate";
import Fuse from "fuse.js";

const SearchResultsPage = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  interface Product {
    [key: string]: any;
  }

  return (
    <>
      <Box as="main" p={4}>
        <Flex justify="flex-end" w="100%">
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(3, minmax(200px, 1fr))"
            maxW="80%"
            w="100%"
            py={10}
            justifyItems="flex-end"
          >
            {/* only works on arrays, so have to check if array is provided */}
            {results.map((product: Product, index: number) => {
              return (
                <Link
                  key={index}
                  to={{
                    pathname: `/products/${product.name}`,
                  }}
                  state={{ product }}
                >
                  <Product
                    key={index}
                    productName={product.name}
                    productDesc={product.description.slice(0, 150) + "..."} // limit char to 150
                    pros={product.pros.slice(0, 3)} //limit to 3
                    cons={product.cons.slice(0, 3)}
                    buttonText="More Info"
                  />
                </Link>
              );
            })}
          </SimpleGrid>
        </Flex>
      </Box>
    </>
  );
};

export default SearchResultsPage;
