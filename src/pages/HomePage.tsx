import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';

function HomePage() {
  return (
    <>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 10, md: 20 }}
        maxH={100}
      >
        <Heading
          fontWeight={1000}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
        >
          <Text as={'span'} color={'green.400'}>
            Find the best
          </Text>{' '}
        </Heading>
        <Box display="flex" justifyContent="center" height="100vh">
          <SearchBar />
        </Box>
      </Stack>
    </>
  );
}

export default HomePage;
