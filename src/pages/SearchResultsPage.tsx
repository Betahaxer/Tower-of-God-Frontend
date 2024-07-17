import { Key, useEffect, useRef, useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Center,
  Divider,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterSortMenu from "../components/FilterSortMenu";
import { getTokens } from "../utils/storage";
import LoadingPage from "../components/LoadingPage";

const SearchResultsPage = () => {
  interface FilterList {
    [key: string]: (string | boolean | null)[]; // Each key maps to a list of lists of strings
  }
  interface Filters {
    q: string;
    category: string;
    ordering: string;
    brand: string;
    price: string;
    review_date: string;
  }
  interface Product {
    [key: string]: any;
  }
  const categoryList = [
    "earphones",
    "keyboard",
    "laptop",
    "mouse",
    "phone",
    "monitor",
    "speaker",
    "television",
  ];

  const location = useLocation();
  const navigate = useNavigate();
  // filters contain the current filters applied by user
  const initialFilters: Filters = {
    q: location.state?.query || "",
    category: "",
    ordering: "",
    brand: "",
    price: "",
    review_date: "",
  };

  // results store all the product details
  const [results, setResults] = useState<Product[]>([]);
  // filterList for the list of possible filters
  const [filterList, setFilterList] = useState<FilterList>({});
  const isFirstRender = useRef(true);
  // nextUrl and hasMore for infinite scrolling
  // nextUrl to get the next page of results
  // hasMore indicates if there are more results, used to render the loading screen
  const [nextUrl, setNextUrl] = useState();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  // Function to update filters
  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  const handleSearch = async () => {
    const queryParams = new URLSearchParams(
      filters as unknown as Record<string, string>
    ).toString();
    console.log(queryParams);
    try {
      const response = await axios.get(`/api/products?${queryParams}`);
      setResults(response.data.results.products);
      setFilterList(response.data.results.filters);
      setNextUrl(response.data.next);
      setHasMore(response.data.next !== null);
      console.log(response.data);
    } catch (error) {
      console.error("Error searching for products", error);
    }
  };
  const fetchMoreData = async () => {
    try {
      const url =
        nextUrl ||
        `/api/products?${new URLSearchParams(
          filters as unknown as Record<string, string>
        ).toString()}`;
      const axiosConfig = nextUrl ? { baseURL: "" } : {};
      const response = await axios.get(url, axiosConfig);
      const newResults: Product[] = response.data.results.products;
      setResults((prevResults) => [...prevResults, ...newResults]);
      setFilterList(response.data.results.filters);
      setNextUrl(response.data.next);
      setHasMore(response.data.next !== null);
      console.log(response.data);
      console.log(response.data.next);
    } catch (error) {
      console.error("Error fetching more products", error);
    }
  };
  const addWishlist = async (product: Product) => {
    console.log(product);
    console.log(product.category);
    console.log(product.id);
    const { accessToken, refreshToken } = getTokens();
    try {
      const response = await axios.post(
        "/api/wishlist/",
        {
          product_category: product.category,
          object_id: product.id,
        },
        {
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            ...(refreshToken && { "Refresh-Token": refreshToken }),
          },
        }
      );
    } catch (error) {
      console.error("Unable to add to wishlist", error);
    }
  };
  const getWishlist = async () => {
    try {
      const { accessToken } = getTokens();
      const response = await axios.get("/api/wishlist/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setWishlist(response.data.results);
    } catch (error) {
      console.error("Request for wishlist failed", error);
    }
  };
  const inWishlist = () => {};
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      //clear filters
      setFilters({
        q: location.state?.query || "",
        category: "",
        ordering: "",
        brand: "",
        price: "",
        review_date: "",
      });
    }
  }, [location.state?.query]);

  // async functions in useeffect can cause race conditions
  // however this is to fix the "No results found" showing for a split second
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      console.log(filters);
      setLoading(true);
      try {
        await handleSearch();
        await getWishlist();
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    console.log(results);
    console.log(wishlist);
    return () => {
      isMounted = false;
    };
  }, [filters]);

  return (
    <>
      <Stack
        direction="column"
        py={10}
        px={10}
        alignItems={"left"}
        spacing={10}
      >
        <FilterSortMenu
          categoryList={categoryList}
          filterList={filterList}
          updateFilter={updateFilter}
          filters={filters}
        ></FilterSortMenu>
      </Stack>
      <Stack direction="column" alignItems={"center"} spacing={10}>
        {loading && <LoadingPage></LoadingPage>}
        {!loading && results.length === 0 && (
          <Text fontSize="3xl" fontWeight="500" color="gray.500">
            {" "}
            No results found
          </Text>
        )}
        {Array.isArray(results) && results.length !== 0 && (
          <InfiniteScroll
            dataLength={results.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <Box py={10} display="flex" justifyContent="center">
                <Spinner size="xl" />
              </Box>
            }
            endMessage={
              <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  End of Page
                </AbsoluteCenter>
              </Box>
            }
          >
            <SimpleGrid
              spacing={4}
              columns={{ base: 1, md: 2, lg: 3 }}
              px="10"
              py="1"
              //justifyItems="flex-end"
            >
              {/* only works on arrays, so have to check if array is provided */}

              {results.map((product: Product, index: number) => {
                return (
                  <Product
                    key={index}
                    data={product}
                    heartFunction={() => addWishlist(product)}
                    filled={false}
                  />
                );
              })}
            </SimpleGrid>
          </InfiniteScroll>
        )}
      </Stack>
    </>
  );
};

export default SearchResultsPage;
