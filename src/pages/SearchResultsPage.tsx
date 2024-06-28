import { Key, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
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
import FilterBox from "../components/FIlterBox";
import axios from "axios";
import { ChevronDownIcon } from "@chakra-ui/icons";

const SearchResultsPage = () => {
  interface FilterList {
    [key: string]: (string | boolean | null)[]; // Each key maps to a list of lists of strings
  }
  const location = useLocation();
  const navigate = useNavigate();
  // list of dictionary of products
  const [results, setResults] = useState<[]>([]);
  const [filterList, setFilterList] = useState<FilterList>({});
  const isFirstRender = useRef(true);
  interface Product {
    [key: string]: any;
  }
  const categoryList = [
    "earbuds",
    "keyboard",
    "laptop",
    "mouse",
    "phone",
    "monitor",
    "speaker",
    "television",
  ];
  const brandList = [
    "Apple",
    "Sony",
    "Bose",
    "Sennheiser",
    "Jabra",
    "Samsung",
    "Beats by Dre",
    "Logitech",
    "Razer",
    "Corsair",
    "SteelSeries",
    "Microsoft",
    "Ducky",
    "HyperX",
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Acer",
    "LG",
    "BenQ",
    "ViewSonic",
    "Google",
    "OnePlus",
    "Xiaomi",
    "Huawei",
    "Oppo",
    "JBL",
    "Sonos",
    "Marshall",
    "Bang & Olufsen",
    "Ultimate Ears",
    "Vizio",
    "TCL",
    "Panasonic",
    "Philips",
  ];

  const [filters, setFilters] = useState({
    q: location.state?.query || "",
    category: "",
    ordering: "",
    brand: "",
    price: "",
    review_date: "",
  });

  // Function to update filters
  const updateFilter = (key: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleSearch = async () => {
    const queryParams = new URLSearchParams(filters).toString();
    try {
      const response = await axios.get(`/api/products?${queryParams}`);
      setResults(response.data.results.products);
      setFilterList(response.data.results.filters);
      console.log(response.data);
      console.log(filterList);
    } catch (error) {
      console.error("Error fetching filtered products", error);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      //console.log(location.state);
      updateFilter("q", location.state?.query || "");
    }
  }, [location.state]);

  useEffect(() => {
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
          <Stack spacing={4} direction="row">
            <Menu closeOnSelect={false}>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Filter By
              </MenuButton>
              <MenuList
                minWidth="240px"
                maxH="60vh"
                overflowY="auto"
                // hide the scroll bar
                css={{
                  "&::-webkit-scrollbar": { display: "none" },
                  msOverflowStyle: "none", // IE and Edge
                  "scrollbar-width": "none", // Firefox
                }}
              >
                <MenuOptionGroup title="Category" type="radio" key="Category">
                  {categoryList.map((category) => (
                    <MenuItemOption
                      key={category}
                      onClick={() => updateFilter("category", category)}
                      textTransform={"capitalize"}
                      value={category}
                    >
                      {category}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>

                {Object.keys(filterList).map((key: string) => {
                  // removes null values and converts true/false into strings for display
                  const filteredOptions = filterList[key]
                    .filter(
                      (
                        option: string | boolean | null
                      ): option is string | boolean => option !== null
                    )
                    .map((option: string | boolean) => {
                      if (option === true) {
                        option = "true";
                      } else if (option === false) {
                        option = "false";
                      }
                      return option as string;
                    });

                  if (filteredOptions.length === 0) {
                    return null; // Skip rendering if no options
                  }
                  return (
                    <>
                      <MenuDivider></MenuDivider>
                      <MenuOptionGroup
                        key={key}
                        title={key.charAt(0).toUpperCase() + key.slice(1)} //capitalize
                        type="radio"
                      >
                        {filteredOptions.slice(0, 5).map((option: string) => (
                          <MenuItemOption
                            key={option}
                            onClick={() => updateFilter(key, option)}
                            textTransform="capitalize"
                            value={option}
                          >
                            {option}
                          </MenuItemOption>
                        ))}
                      </MenuOptionGroup>
                    </>
                  );
                })}
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Sort By
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => updateFilter("ordering", "price")}>
                  Price
                </MenuItem>
                <MenuItem onClick={() => updateFilter("ordering", "-price")}>
                  Price (descending)
                </MenuItem>
                <MenuItem
                  onClick={() => updateFilter("ordering", "review_date")}
                >
                  Review Date
                </MenuItem>
                <MenuItem
                  onClick={() => updateFilter("ordering", "-review_date")}
                >
                  Review Date (descending)
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Box>
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
      </Stack>
    </>
  );
};

export default SearchResultsPage;
