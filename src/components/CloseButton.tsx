import { CloseIcon } from "@chakra-ui/icons";
import { Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface CloseButtonProps {
  text: string;
  onClick: () => void;
}
const CloseButton: React.FC<CloseButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      variant="ghost"
      background="gray.100"
      aria-label="Close"
      _hover={{ background: "gray.200" }}
      rightIcon={<CloseIcon boxSize={2} />}
      onClick={onClick}
      color={useColorModeValue("gray.900", "gray.600")}
    >
      {text}
    </Button>
  );
};

export default CloseButton;
