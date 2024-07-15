import { useState } from "react";
import "./Slideout.css";
import { Box, CloseButton, Heading, Stack } from "@chakra-ui/react";

const SlideoutMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="slideout-menu-container">
        <button onClick={toggleMenu}>Toggle Menu</button>
      </div>
      <div className={`slideout-menu ${isOpen ? "open" : ""}`}>
        <Stack
          display="flex"
          direction="row"
          borderColor="black"
          borderWidth={1}
        >
          <Heading mb="0" p="2" fontWeight="300">
            Wishlist
          </Heading>
          <Box
            display="flex"
            width="100%"
            justifyContent="right"
            alignItems="center"
          >
            <CloseButton size="lg"></CloseButton>
          </Box>
        </Stack>
        <ul>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
          <li>Menu Item 4</li>
        </ul>
      </div>
    </>
  );
};

export default SlideoutMenu;
