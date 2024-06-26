import { Key, useEffect, useState } from "react";
import { SimpleGrid, Stack } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import FilterBox from "../components/FIlterBox";
import axios from "axios";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let { results, query } = location.state || { results: [], query: "" };
  console.log(results);
  console.log(query);
  interface Product {
    [key: string]: any;
  }

  const category = [
    "earphone",
    "keyboard",
    "laptop",
    "mouse",
    "phone",
    "monitor",
    "speaker",
    "television",
  ];
  const [filteredCategory, setFilteredCategory] = useState<string>("");
  const handleFilterChange = (selectedCategory: string) => {
    setFilteredCategory(selectedCategory);
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        let url = `/api/products/`;
        if (!query) {
          query = "laptop";
        }
        //console.log(url);

        // Querying the database based on category and simple filtering with user query
        const response = await axios.get(url, {
          params: { q: query, category: filteredCategory },
        });

        //console.log(response.data.results);
        console.log("testing");

        // Passing the data to the search results page
        navigate("/search", {
          state: { results: response.data.results, query },
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [filteredCategory]);

  return (
    <>
      <Stack direction="row" py={10}>
        <FilterBox
          heading="Categories"
          options={category}
          onFilterChange={handleFilterChange}
        ></FilterBox>
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
