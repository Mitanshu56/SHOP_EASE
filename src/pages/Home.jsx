import { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import SearchFilterBar from "../components/SearchFilterBar";
import { dummyProducts } from "../services/dummyProducts";
import useDebounce from "../hooks/useDebounce";
export default function Home() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 1000);
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sort, setSort] = useState("default");

  const searchedProducts = dummyProducts.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const categoryProducts = searchedProducts.filter((product) =>
    category === "all" ? true : product.category === category,
  );

  const minPriceProducts = categoryProducts.filter((product) =>
    minPrice === "" ? true : product.price >= Number(minPrice),
  );

  const maxPriceProducts = minPriceProducts.filter((product) =>
    maxPrice === "" ? true : product.price <= Number(maxPrice),
  );

  const sortedProducts = [...maxPriceProducts].sort((a, b) => {
    if (sort === "price-low") {
      return a.price - b.price;
    }

    if (sort === "price-high") {
      return b.price - a.price;
    }

    if (sort === "name-a-z") {
      return a.title.localeCompare(b.title);
    }

    if (sort === "name-z-a") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Shop the Catalog
      </h1>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sort={sort}
        setSort={setSort}
      />

      <ProductGrid products={sortedProducts} />
    </main>
  );
}
