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
import { useLocation } from "react-router-dom";
import CompareHeader from "../components/CompareHeader";

interface Product {
  [key: string]: any;
}

interface ProductList {
  [index: number]: Product;
}

const ComparePage = (products: ProductList) => {
  const location = useLocation();
  const product = location.state?.product;
  //console.log(product);
  return (
    <>
      <CompareHeader></CompareHeader>
      {/* <CompareCard data={product}></CompareCard> */}
    </>
  );
};

export default ComparePage;
