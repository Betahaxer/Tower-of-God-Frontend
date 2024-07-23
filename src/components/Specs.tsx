import { List, ListItem, Text } from "@chakra-ui/react";
import React from "react";

interface Product {
  category: string;
  [key: string]: any;
}

interface ProductProps {
  product: Product;
  keys: { [key: string]: string[] };
}

const Specs: React.FC<ProductProps> = ({ product, keys }) => {
  const placeholder = () => (
    <List>
      <ListItem>Details not available, sorry!</ListItem>
    </List>
  );
  if (!keys[product.category]) {
    return placeholder();
  }
  const keysToRender = keys[product.category];
  function formatText(text: string): string {
    let formattedText = text.replace(/_/g, " ");

    formattedText = formattedText
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return formattedText;
  }

  return (
    <List spacing={2}>
      {keysToRender.map((key, index) => {
        if (typeof product[key] === "boolean") {
          return (
            <ListItem key={index}>
              <Text as={"span"} fontWeight={"bold"}>
                {formatText(key) + ":"}
              </Text>{" "}
              {product[key] ? "Yes" : "No"}
            </ListItem>
          );
        }
        if (product.category === "keyboard" && key === "size") {
          return (
            <ListItem key={index}>
              <Text as={"span"} fontWeight={"bold"}>
                {formatText(key) + ":"}
              </Text>{" "}
              {product[key] ? product[key] + "%" : "-"}
            </ListItem>
          );
        }
        if (
          (product.category === "phone" && key === "size") ||
          key === "screen_size"
        ) {
          return (
            <ListItem key={index}>
              <Text as={"span"} fontWeight={"bold"}>
                {formatText(key) + ":"}
              </Text>{" "}
              {product[key] ? product[key] + " in" : "-"}
            </ListItem>
          );
        }
        if (key === "battery_life") {
          const result = product[key][0]?.split("(")[0].trim();
          return (
            <ListItem key={index}>
              <Text as={"span"} fontWeight={"bold"}>
                {formatText(key) + ":"}
              </Text>{" "}
              {result ? result : "-"}
            </ListItem>
          );
        }
        if (key === "refresh_rate") {
          return (
            <ListItem key={index}>
              <Text as={"span"} fontWeight={"bold"}>
                {formatText(key) + ":"}
              </Text>{" "}
              {product[key] ? product[key] + " Hz" : "-"}
            </ListItem>
          );
        }
        if (key === "screen_resolution") {
          return (
            <ListItem key={index}>
              <Text as={"span"} fontWeight={"bold"}>
                {formatText(key) + ":"}
              </Text>{" "}
              {product[key] ? product[key] + " pixels" : "-"}
            </ListItem>
          );
        }
        return (
          <ListItem key={index}>
            <Text as={"span"} fontWeight={"bold"}>
              {formatText(key) + ":"}
            </Text>{" "}
            {product[key] ? product[key] : "-"}
          </ListItem>
        );
      })}
    </List>
  );
};

export default Specs;
