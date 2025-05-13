import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SortDropDown from "../components/SortDropDown";
import { getProductByCategory, getProductBySearch } from "../src/api/userApis";

const CollectionPage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [sortBy, setSortBy] = useState("Low to High");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: [],
    subCategory: [],
  });

  const sortOptionsArray = ["Low to High", "High to Low"];
  const filterCategory = ["Men", "Women", "Kids"];
  const filterSubCategory = ["Topwear", "Bottomwear", "Winterwear"];

  useEffect(() => {
    const sortedProducts = [...allProducts].sort((a, b) => {
      if (sortBy === "Low to High") {
        return a.price - b.price;
      } else if (sortBy === "High to Low") {
        return b.price - a.price;
      }
    });
    setAllProducts(sortedProducts);
  }, [sortBy]);

  useEffect(() => {
    const categoryString = filters.category.join(",");
    const subCategoryString = filters.subCategory.join(",");
    const params = {
      "Low to High": "asc",
      "High to Low": "desc",
    };
    const getProductsByCategory = async () => {
      try {
        const response = await getProductByCategory(
          categoryString,
          subCategoryString,
          params[sortBy]
        );
        setAllProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getProductsByCategory();
  }, [filters.category, filters.subCategory]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full relative">
      {/* Search Bar */}
      {showSearch && (
        <div className="absolute top-0 left-0 w-full bg-white shadow-md p-4 flex items-center justify-between z-10 gap-2">
          <input
            type="text"
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none h-10"
          />

          <button
            onClick={() => {
              if (!searchQuery) return;
              const getProductsBySearch = async () => {
                try {
                  const searchedProducts = [];
                  setLoading(true);
                  const response = await getProductBySearch(searchQuery);
                  response?.data.data.map((element) => {
                    return searchedProducts.push(element?.item);
                  });
                  setAllProducts(searchedProducts);
                  setLoading(false);
                } catch (error) {
                  console.log("Error: ", error);
                  setLoading(false);
                }
                setSearchQuery("");
              };
              getProductsBySearch(searchQuery);
            }}
            className="w-[10%] uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
          >
            search
          </button>
          <button
            className="w-[10%] uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
            onClick={() => setShowSearch(false)}
          >
            close
          </button>
        </div>
      )}

      <div className="flex gap-2 w-[100%] no-scrollbar mt-14">
        <div className="w-[23%] px-14 mt-14">
          <div className="flex flex-col gap-2">
            <p className="text-gray-700 text-2xl">FILTERS</p>

            <div className="w-[100%] border-gray-300 border-2 h-[150px] p-4">
              <p>CATEGORIES</p>
              <div className="mt-2 flex flex-col gap-2">
                {filterCategory.map((element, index) => {
                  return (
                    <div className="flex gap-2 items-center" key={index}>
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-black"
                        onChange={() => {
                          if (filters.category.includes(element)) {
                            setFilters({
                              ...filters,
                              category: filters.category.filter(
                                (item) => item !== element
                              ),
                            });
                          } else {
                            setFilters({
                              ...filters,
                              category: [...filters.category, element],
                            });
                          }
                        }}
                      />
                      <span>{element}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-[100%] border-gray-300 border-2 h-[150px] p-4 mt-2">
              <p>TYPE</p>
              <div className="mt-2 flex flex-col gap-2">
                {filterSubCategory.map((element, index) => {
                  return (
                    <div className="flex gap-2 items-center" key={index}>
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-black"
                        onChange={() => {
                          if (filters.subCategory.includes(element)) {
                            setFilters({
                              ...filters,
                              subCategory: filters.subCategory.filter(
                                (item) => item !== element
                              ),
                            });
                          } else {
                            setFilters({
                              ...filters,
                              subCategory: [...filters.subCategory, element],
                            });
                          }
                        }}
                      />
                      <span>{element}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-[65%]">
          {/* Header with Search and Sort */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <p className="text-gray-500 text-2xl">ALL</p>
              <p className="font-semibold text-2xl">COLLECTIONS</p>
              <div className="ml-2 w-10 h-[2px] bg-gray-700 mt-4"></div>
            </div>

            <div className="flex w-[40%] gap-3 items-center">
              <button
                onClick={() => setShowSearch(true)}
                className="w-[30%] uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
              >
                Search
              </button>
              <SortDropDown
                category={"Sort By: Price"}
                optionsArray={sortOptionsArray}
                state={sortBy}
                setState={setSortBy}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-4 flex flex-wrap gap-y-5 gap-8">
            {allProducts.length > 0 ? (
              allProducts?.map((element) => (
                <ProductCard key={element?._id} product={element} />
              ))
            ) : (
              <div className="flex gap-7 items-center">
                <p className="text-3xl mt-6">No Products found</p>
                <img
                  src="../src/assets/admin_assets/no-order.png"
                  className="w-16 h-16 mt-6"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
