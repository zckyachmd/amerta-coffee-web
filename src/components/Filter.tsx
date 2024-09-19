// components/Filter.tsx
import React, { useState } from "react";

interface FilterProps {
  onCategoryChange: (category: string) => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
  onSortChange: (sortBy: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  onCategoryChange,
  onPriceChange,
  onSortChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [sortBy, setSortBy] = useState<string>("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handlePriceChange = () => {
    onPriceChange(minPrice, maxPrice);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value;
    setSortBy(sortBy);
    onSortChange(sortBy);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filter</h3>
      <div className="mb-4">
        <label htmlFor="sort" className="block text-sm font-medium mb-2">
          Sort By
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="block w-full border border-gray-300 rounded p-2"
        >
          <option value="">Select</option>
          <option value="price_asc">Price Low to High</option>
          <option value="price_desc">Price High to Low</option>
          <option value="name_asc">Name A-Z</option>
          <option value="name_desc">Name Z-A</option>
          <option value="rating_desc">Rating High to Low</option>
          <option value="rating_asc">Rating Low to High</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="block w-full border border-gray-300 rounded p-2"
        >
          <option value="">All Categories</option>
          <option value="coffee">Coffee</option>
          <option value="tea">Tea</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price Range</label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(parseFloat(e.target.value))}
            className="border border-gray-300 rounded p-2 w-1/2"
            placeholder="Min Price"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
            className="border border-gray-300 rounded p-2 w-1/2"
            placeholder="Max Price"
          />
        </div>
        <button
          onClick={handlePriceChange}
          className="mt-2 bg-[#986B54] text-white px-4 py-2 rounded hover:bg-[#8c5b43]"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
