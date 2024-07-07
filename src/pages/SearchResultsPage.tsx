import { Key, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  filter,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import axios from "axios";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterSortMenu from "../components/FilterSortMenu";

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
  const location = useLocation();
  const navigate = useNavigate();

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
  // filters contain the current filters applied by user
  const initialFilters: Filters = {
    q: location.state?.query || "",
    category: "",
    ordering: "",
    brand: "",
    price: "",
    review_date: "",
  };
  const [filters, setFilters] = useState<Filters>(initialFilters);

  // Function to update filters
  const updateFilter = (key: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleSearch = async () => {
    const queryParams = new URLSearchParams(
      filters as unknown as Record<string, string>
    ).toString();
    try {
      const response = await axios.get(`/api/products?${queryParams}`);
      setResults(response.data.results.products);
      setFilterList(response.data.results.filters);
      setNextUrl(response.data.next);
      setHasMore(response.data.next !== null);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching filtered products", error);
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
      console.error("Error fetching products", error);
    }
  };

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
  }, [location.state.query]);

  useEffect(() => {
    console.log(filters);
    handleSearch();
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
        <Box>
          <FilterSortMenu
            categoryList={categoryList}
            filterList={filterList}
            updateFilter={updateFilter}
            filters={filters}
          ></FilterSortMenu>
        </Box>
        <InfiniteScroll
          dataLength={results.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more items to load</p>}
        >
          <SimpleGrid
            spacing={4}
            columns={{ base: 1, md: 2, lg: 3 }}
            justifyItems="flex-end"
          >
            {/* only works on arrays, so have to check if array is provided */}
            {Array.isArray(results) &&
              results.length !== 0 &&
              results.map((product: Product, index: number) => {
                return (
                  <Link
                    key={index}
                    to={{
                      pathname: `/products/${product.name}`,
                    }}
                    state={{ product }}
                  >
                    <Product data={product} />
                  </Link>
                );
              })}
          </SimpleGrid>
        </InfiniteScroll>
      </Stack>
    </>
  );
};

export default SearchResultsPage;
