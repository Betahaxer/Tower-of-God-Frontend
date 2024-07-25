import React, { useRef, useEffect, useState } from "react";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { motion, useScroll, useInView } from "framer-motion";

// Horizontal scroll box for AboutPage
interface Props {
  components: React.ReactNode[];
}

const HorizontalScrollBox = ({ components }: Props) => {
  return (
    <HStack
      h={"70vh"}
      maxW={"100%"}
      spacing={"2vw"}
      overflowX="auto"
      whiteSpace="nowrap"
      align={"start"}
      scrollBehavior={"smooth"}
    >
      {components.map((Component, index) => (
        <div key={index}>{Component}</div>
      ))}
    </HStack>
  );
};

export default HorizontalScrollBox;
