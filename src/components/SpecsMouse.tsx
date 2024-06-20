import { List, ListItem, Text } from "@chakra-ui/react";
import React from "react";

interface Product {
  [key: string]: any;
}

const SpecsMouse = (data: Product) => {
  const product = data;
  return (
    <>
      <List spacing={2}>
        <ListItem>
          <Text as={"span"} fontWeight={"bold"}>
            Buttons Count:
          </Text>{" "}
          {product.buttons_count ? product.buttons_count : "-"}
        </ListItem>
        <ListItem>
          <Text as={"span"} fontWeight={"bold"}>
            DPI:
          </Text>{" "}
          {product.dpi ? product.dpi : "-"}
        </ListItem>
        <ListItem>
          <Text as={"span"} fontWeight={"bold"}>
            Weight:
          </Text>{" "}
          {product.weight ? product.weight : "-"}
        </ListItem>
        <ListItem>
          <Text as={"span"} fontWeight={"bold"}>
            Wireless:
          </Text>{" "}
          {product.hasOwnProperty("wireless")
            ? product.wireless
              ? "Yes"
              : "No"
            : "-"}
        </ListItem>
      </List>
    </>
  );
};

export default SpecsMouse;
