"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import SearchBar from "./SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearTokens, getTokens } from "../utils/storage";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  // dont show search bar in nav bar in homepage
  const showSearchBar = location.pathname === "/" ? false : true;
  const { isLoggedIn, login, logout } = useAuth();

  const handleLogout = async () => {
    const { accessToken, refreshToken } = getTokens();
    console.log(accessToken, refreshToken);

    try {
      const response = await axios.post(
        "/api/logout/",
        {}, // Empty body for the POST request
        {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...(refreshToken && { "Refresh-Token": refreshToken }),
          },
        }
      );
      clearTokens();
      logout();
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align="center"
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            onClick={() => navigate("/")}
            my="auto"
          >
            Choice
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
          {showSearchBar && <SearchBar></SearchBar>}
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!isLoggedIn && (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"#"}
                onClick={() => navigate("/login")}
                _hover={{
                  textDecoration: "none",
                }}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"green.400"}
                href={"#"}
                _hover={{
                  bg: "green.300",
                }}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"green.400"}
              href={"#"}
              _hover={{
                bg: "green.300",
              }}
              onClick={() => {
                handleLogout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} minW={140}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const navigate = useNavigate();
  const onSearch = async (query: string) => {
    try {
      let url = `/api/products/`;
      if (!query) {
        query = "mouse";
      }
      console.log(url);
      // querying the database based on category and simple filtering with user query
      const response = await axios.get(url, {
        params: { q: query },
      });

      //console.log(response.data.results);

      // passing the data to the search results page
      navigate("/search", { state: { results: response.data.results, query } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
      onClick={() => {
        onSearch(label);
      }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "green.400" }}
            fontWeight={500}
            textTransform="capitalize"
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"green.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Product Categories",
    children: [
      {
        label: "earphone",
        subLabel: "Explore more...",
      },
      {
        label: "keyboard",
        subLabel: "Explore more",
      },
      {
        label: "laptop",
        subLabel: "Explore more",
      },
      {
        label: "mouse",
        subLabel: "Explore more",
      },
      {
        label: "phone",
        subLabel: "Explore more",
      },
      {
        label: "monitor",
        subLabel: "Explore more",
      },
      {
        label: "speaker",
        subLabel: "Explore more",
      },
      {
        label: "television",
        subLabel: "Explore more",
      },
    ],
  },
];
