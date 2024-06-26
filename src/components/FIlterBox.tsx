import React, { useState } from "react";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

interface FilterBoxProps {
  heading: string;
  options: string[];
  onFilterChange: (selectedCategories: string) => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({
  heading,
  options,
  onFilterChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCheckboxChange = (selectedValues: string) => {
    setSelectedCategory(selectedValues);
    onFilterChange(selectedValues);
  };

  return (
    <RadioGroup
      colorScheme="green"
      value={selectedCategory}
      onChange={handleCheckboxChange}
    >
      <Stack spacing={[1]} direction={"column"} px={10}>
        <Text fontWeight={"800"} color={"green.400"}>
          {heading}
        </Text>
        {options.map((category: string, index: number) => (
          <Box _hover={{ background: "green.50" }} borderRadius={5}>
            <Radio
              key={index}
              value={category}
              px={3}
              display="flex"
              textAlign="center"
            >
              <Text m={0} textTransform={"capitalize"}>
                {category}
              </Text>
            </Radio>
          </Box>
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default FilterBox;
