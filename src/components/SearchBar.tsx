import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

interface Props {
  onClick: () => void;
}

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState("");

  // we have to categorize the search query into our predefined database so that
  // we can search in the corresponding database

  // aliases for each category
  const categories = [
    {
      name: "earbuds",
      aliases: [
        "earbuds",
        "earbud",
        "earphones",
        "in-ear headphones",
        "wireless earbuds",
        "Bluetooth earbuds",
        "true wireless",
      ],
    },
    {
      name: "headphones",
      aliases: [
        "headphones",
        "headphone",
        "over-ear headphones",
        "on-ear headphones",
        "wireless headphones",
        "Bluetooth headphones",
        "noise-canceling headphones",
      ],
    },
    {
      name: "keyboard",
      aliases: [
        "keyboard",
        "keyboards",
        "mechanical keyboard",
        "membrane keyboard",
        "wireless keyboard",
        "Bluetooth keyboard",
        "gaming keyboard",
      ],
    },
    {
      name: "laptop",
      aliases: [
        "laptops",
        "laptop",
        "notebook",
        "notebooks",
        "ultrabook",
        "laptop computer",
        "portable computer",
      ],
    },
    {
      name: "mouse",
      aliases: [
        "mouse",
        "mice",
        "computer mouse",
        "wireless mouse",
        "Bluetooth mouse",
        "gaming mouse",
        "optical mouse",
      ],
    },
  ];
  // default category is mouse if no search input
  let category = "mouse";

  // creating a new fuse object to see if the query matches any category
  const fuse = new Fuse(categories, {
    threshold: 0.6, //lower score for more precise matches
    includeScore: true,
    keys: ["aliases"],
  });

  const onSearch = async (query: string) => {
    try {
      // finding the category for the query and returning the most relevant one
      // const searchCategory = fuse.search(query);

      // if (searchCategory.length > 0) {
      //   category = searchCategory[0].item.name;
      // }

      // setting the corresponding DRF url
      let url = `/api/products/`;
      console.log(url);

      // querying the database based on category and simple filtering with user query
      const response = await axios.get(url, {
        params: { q: query },
      });
      console.log(response.data.results);

      // // applying fuzzy search on the response
      // const fuseResults = new Fuse(response.data.results, {
      //   threshold: 0.7, //lower score for more precise matches
      //   //includeScore: true,
      //   keys: ["name", "brand"],
      // });
      // const searchResult = fuseResults.search(query);

      // // ensure that the data passed is of the correct type
      // let eachResult = [];
      // for (let i = 0; i < searchResult.length; i++) {
      //   eachResult[i] = searchResult[i]["item"];
      // }

      // passing the data to the search results page
      navigate("/search", { state: { results: response.data.results } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <InputGroup maxW="50%">
      <Input
        placeholder="Search..."
        bg="white"
        _placeholder={{ color: "gray.500" }}
        value={searchResults}
        onChange={(e) => setSearchResults(e.target.value)}
      />
      <InputRightElement>
        <Button
          bg="teal.500"
          _hover={{ bg: "teal.600" }}
          onClick={() => onSearch(searchResults)}
        >
          <SearchIcon color="white" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
