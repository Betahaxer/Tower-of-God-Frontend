import { Key, useEffect, useState } from "react";
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
  const location = useLocation();
  const navigate = useNavigate();
  const { query } = location.state || { query: "" };
  const [results, setResults] = useState([]);
  interface Product {
    [key: string]: any;
  }
  const categoryList = [
    "earphone",
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
    q: query,
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
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching filtered products", error);
    }
  };
  useEffect(() => {
    console.log("meow");
    console.log(query);
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
            <Input
              value={filters.q}
              onChange={(e) => updateFilter("q", e.target.value)}
              placeholder="Search query"
              maxW="15%"
            />

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
                  "-ms-overflow-style": "none", // IE and Edge
                  "scrollbar-width": "none", // Firefox
                }}
              >
                <MenuOptionGroup title="Category" type="radio">
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
                <MenuDivider></MenuDivider>
                <MenuOptionGroup title="Brand" type="radio">
                  {brandList.map((brand) => (
                    <MenuItemOption
                      key={brand}
                      onClick={() => updateFilter("brand", brand)}
                      textTransform={"capitalize"}
                      value={brand}
                    >
                      {brand}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
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

            <Button onClick={handleSearch}>Search</Button>
          </Stack>
        </Box>
        <SimpleGrid
          spacing={4}
          columns={{ base: 1, md: 2, lg: 3 }}
          justifyItems="flex-end"
        >
          {/* only works on arrays, so have to check if array is provided */}
          {results.map((product: Product, index: number) => {
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
