import { render, screen } from "@testing-library/react";
import CompareCard from "./CompareCard";

const mockProduct = {
  name: "Test Product",
  category: "mouse",
  img: "/path/to/image.jpg",
  price: 100,
  pros: ["Pro 1", "Pro 2", "Pro 3", "Pro 4", "Pro 5"],
  cons: ["Con 1", "Con 2", "Con 3", "Con 4", "Con 5"],
};

describe("CompareCard component", () => {
  it("renders CompareCard correctly with mouse category", () => {
    render(<CompareCard product={mockProduct} />);

    // Check if product details are rendered
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    //expect(screen.getByText("mouse")).toBeInTheDocument(); // Assuming category is capitalized

    // Check if price is correctly rendered
    expect(screen.getByText("$100")).toBeInTheDocument();

    // Check if product image is rendered with correct alt and src
    const productImage = screen.getByAltText("product image");
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute("src", "/path/to/image.jpg");

    // Check if pros and cons are rendered
    mockProduct.pros.forEach((pro) => {
      expect(screen.getByText(pro)).toBeInTheDocument();
    });
    mockProduct.cons.forEach((con) => {
      expect(screen.getByText(con)).toBeInTheDocument();
    });

    // Check if category-specific component (SpecsMouse) is rendered
    //expect(screen.getByText("Mouse Specifications")).toBeInTheDocument();
    // Additional specific checks for SpecsMouse component rendering
  });

  it("renders placeholder when category is not defined in categoryMap", () => {
    const mockProductWithoutCategory = { ...mockProduct, category: "unknown" };
    render(<CompareCard product={mockProductWithoutCategory} />);

    // Check if placeholder content is rendered
    expect(
      screen.getByText("Details not available, sorry!")
    ).toBeInTheDocument();
  });
});
