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
import WithSubnavigation from "../components/NavBar";
import Fuse from "fuse.js";

const SearchResultsPage = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  interface Product {
    [key: string]: any;
  }

  return (
    <>
      <SimpleGrid
        spacing={4}
        columns={{ base: 1, md: 2, lg: 3 }}
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
              <Product data={product} />
            </Link>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default SearchResultsPage;
