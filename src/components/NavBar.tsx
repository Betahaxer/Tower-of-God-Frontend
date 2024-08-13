'use client';

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
  Image,
  HStack,
  useToast,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

import SearchBar from './SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearTokens, getTokens } from '../utils/storage';
import { useAuth } from '../contexts/AuthContext';
import { DarkModeButton } from './DarkModeButton';

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  // dont show search bar in nav bar in homepage
  const showSearchBar = location.pathname === '/' ? false : true;
  const { isLoggedIn, login, logout } = useAuth();
  const toast = useToast();
  const handleLogout = async () => {
    const { accessToken, refreshToken } = getTokens();
    console.log(accessToken, refreshToken);

    try {
      const response = await axios.post(
        '/api/logout/',
        {}, // Empty body for the POST request
        {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...(refreshToken && { 'Refresh-Token': refreshToken }),
          },
        },
      );
      logout();
      console.log('Response:', response);
    } catch (error) {
      logout();
      console.error('Error:', error);
    }
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'70px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'start' }}
          align="center"
          gap="10"
          px="5"
        >
          <HStack
            onClick={() => navigate('/')}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={`/wiz1.svg`}
              alt="Logo"
              maxH="40px"
              objectFit="contain"
            />
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('green.400', 'green.400')}
              fontWeight={800}
              mb={0}
              fontSize="xl"
              _hover={{ cursor: 'pointer' }}
            >
              Choice
            </Text>
          </HStack>

          <Flex display={{ base: 'none', md: 'flex' }} ml={0}>
            <DesktopNav />
          </Flex>
          {showSearchBar && <SearchBar></SearchBar>}
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={3}
        >
          <DarkModeButton />
          {!isLoggedIn && (
            <>
              <Button
                fontSize={'sm'}
                fontWeight={500}
                bg={useColorModeValue('white', 'gray.600')}
                color={useColorModeValue('gray.600', 'white')}
                onClick={() => navigate('/login')}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Sign In
              </Button>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={500}
                color={'white'}
                bg={'green.400'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'green.500',
                }}
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={500}
              color={'white'}
              bg={'green.400'}
              _hover={{
                textDecoration: 'none',
                bg: 'green.500',
              }}
              onClick={() => {
                handleLogout();
                navigate('/');
                toast({
                  title: 'Logged out!',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                });
              }}
            >
              Log Out
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                maxW="70%"
                maxH="80vh"
              >
                <Stack
                  overflow="scroll"
                  css={{
                    cursor: 'pointer',
                  }}
                >
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

const DesktopSubNav = ({ label, href }: NavItem) => {
  const navigate = useNavigate();
  const onSearch = async (query: string) => {
    try {
      // const url = `/api/products/`;
      // // querying the database based on category and simple filtering with user query
      // const response = await axios.get(url, {
      //   params: { q: query },
      // });

      // passing the data to the search results page
      navigate('/search', { state: { category: query } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
      onClick={() => {
        onSearch(label);
      }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            m="2"
            transition={'all .3s ease'}
            _groupHover={{ color: 'green.400' }}
            fontWeight={500}
            textTransform="capitalize"
          >
            {label}
          </Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
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
    label: 'About',
    href: '/about',
  },
  {
    label: 'Categories',
    children: [
      {
        label: 'keyboard',
        subLabel: 'Explore more',
      },
      {
        label: 'laptop',
        subLabel: 'Explore more',
      },
      {
        label: 'mouse',
        subLabel: 'Explore more',
      },
      {
        label: 'phone',
        subLabel: 'Explore more',
      },
      {
        label: 'monitor',
        subLabel: 'Explore more',
      },
      {
        label: 'speaker',
        subLabel: 'Explore more',
      },
      {
        label: 'television',
        subLabel: 'Explore more',
      },
      {
        label: 'earbuds',
        subLabel: 'Explore more...',
      },
    ],
  },
  {
    label: 'Compare',
    href: '/compare',
  },
  {
    label: 'Wishlist',
    href: '/wishlist',
  },
];
