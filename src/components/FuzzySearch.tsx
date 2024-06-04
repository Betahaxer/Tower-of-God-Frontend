import Fuse from "fuse.js";

// Define categories as an array of objects with category names and their aliases
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

const fuse = new Fuse(categories, {
  threshold: 0.6, //lower score for more precise matches
  //includeScore: true,
  keys: ["aliases"],
});

// FuzzySearch component
const FuzzySearch = () => {
  const searchResult = fuse.search("laptops");

  console.log(searchResult);

  return (
    <div>
      {searchResult.length > 0
        ? `Matched Category: ${searchResult[0].item.name}`
        : "No Match Found"}
    </div>
  );
};

export default FuzzySearch;
