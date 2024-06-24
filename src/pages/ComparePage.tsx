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
      <CompareHeader></CompareHeader>
    </>
  );
};

export default ComparePage;
