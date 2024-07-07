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

interface FilterSortProps {
  categoryList: string[];
  filterList: FilterList;
  updateFilter: (key: string, value: any) => void;
}

const FilterSortMenu = ({
  categoryList,
  filterList,
  updateFilter,
}: FilterSortProps) => {
  return (
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
                >
                  {filteredOptions.slice(0, 5).map((option) => (
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
          <MenuItem onClick={() => updateFilter("ordering", "-review_date")}>
            Review Date (descending)
          </MenuItem>
        </MenuList>
      </Menu>
      <CloseButton text="test" onClick={() => {}}></CloseButton>
    </Stack>
  );
};

export default FilterSortMenu;
