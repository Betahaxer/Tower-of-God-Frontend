import React from "react";
import {
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import CloseButton from "./CloseButton";

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
interface FilterSortProps {
  categoryList: string[];
  filterList: FilterList;
  updateFilter: (key: keyof Filters, value: any) => void;
  filters: Filters;
}
interface FilterButtonsProps {
  filters: Filters;
  updateFilter: (key: keyof Filters, value: string) => void;
}

const FilterSortMenu = ({
  categoryList,
  filterList,
  updateFilter,
  filters,
}: FilterSortProps) => {
  const handleUpdateFilter = (key: keyof Filters, value: string) => {
    filters[key] === value ? updateFilter(key, "") : updateFilter(key, value);
  };

  return (
    <>
      <Stack spacing={4} direction="row">
        <Stack spacing={4} direction="row">
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Filter By
            </MenuButton>
            <MenuList
              minWidth="240px"
              maxH="60vh"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": { display: "none" },
                msOverflowStyle: "none", // IE and Edge
                scrollbarWidth: "none", // Firefox
              }}
            >
              <MenuOptionGroup
                title="Category"
                type="radio"
                key="Category"
                value={filters.category}
              >
                {categoryList.map((category) => (
                  <MenuItemOption
                    key={category}
                    onClick={() => handleUpdateFilter("category", category)}
                    textTransform={"capitalize"}
                    value={category}
                  >
                    {category}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>

              {Object.keys(filterList).map((key) => {
                // removes null values and converts true/false into strings for display
                const filteredOptions = filterList[key]
                  .filter((option) => option !== null)
                  .map((option) => {
                    if (option === true) {
                      option = "true";
                    } else if (option === false) {
                      option = "false";
                    }
                    return option;
                  });

                if (filteredOptions.length === 0) {
                  return null; // Skip rendering if no options
                }
                return (
                  <React.Fragment key={key}>
                    <MenuDivider key={`${key}-divider`} />
                    <MenuOptionGroup
                      key={key}
                      title={key.charAt(0).toUpperCase() + key.slice(1)} //capitalize
                      type="radio"
                      value={filters[key as keyof Filters]}
                    >
                      {filteredOptions.slice(0, 5).map((option) => (
                        <MenuItemOption
                          key={option}
                          onClick={() => {
                            handleUpdateFilter(key as keyof Filters, option);
                          }}
                          textTransform="capitalize"
                          value={option}
                        >
                          {option}
                        </MenuItemOption>
                      ))}
                    </MenuOptionGroup>
                  </React.Fragment>
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
              <MenuItem onClick={() => updateFilter("ordering", "review_date")}>
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

        <Stack direction="row" spacing="4" overflow="auto">
          <FilterButtons
            filters={filters}
            updateFilter={updateFilter}
          ></FilterButtons>
        </Stack>
      </Stack>
    </>
  );
};

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filters,
  updateFilter,
}) => {
  // Filter keys and values where values are truthy
  const filteredEntries = Object.entries(filters)
    .filter(([key, value]) => Boolean(value)) // Only keep entries where value is truthy
    .map(([key, value]) => ({ key, value })); // Map to an array of objects containing key-value pairs
  const capitalize = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };
  return (
    <>
      {filteredEntries.map(({ key, value }) => {
        let displayKey = key === "q" ? "Query" : capitalize(key);
        let displayValue = key === "q" ? value : capitalize(value);
        return (
          <Box>
            <CloseButton
              key={key}
              text={`${displayKey}: ${displayValue}`} // Display key and value as text for the button
              onClick={() => {
                updateFilter(key as keyof Filters, "");
              }}
            />
          </Box>
        );
      })}
    </>
  );
};

export default FilterSortMenu;
