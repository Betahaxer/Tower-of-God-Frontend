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
  Stack,
} from "@chakra-ui/react";
import CompareCard from "../components/CompareCard";
import { useLocation } from "react-router-dom";
import CompareHeader from "../components/CompareHeader";

const ComparePage = () => {
  const location = useLocation();
  const product = location.state?.product;
  console.log(product);
  return (
    <>
      {/* <CompareHeader></CompareHeader> */}
      <Stack
        direction="row"
        spacing={{ base: 4, md: 6 }}
        py={{ base: 9, md: 12 }}
        px={{ base: 20, md: 10 }}
      >
        <CompareCard product={product}></CompareCard>
        <CompareCard product={product}></CompareCard>
      </Stack>
    </>
  );
};

export default ComparePage;
