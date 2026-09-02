import { useState, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import SearchFilterBar from "../components/SearchFilterBar";
import { getProducts } from "../services/products";
import useDebounce from "../hooks/useDebounce";

export default function Home({ onViewDetails }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const searchedProducts = products.filter((product) =>
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

  if (loading) {
    return (
      <main>
        <p>Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>

        <button type="button" onClick={fetchProducts}>
          Retry
        </button>
      </main>
    );
  }

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
      <ProductGrid products={sortedProducts} onViewDetails={onViewDetails} />
    </main>
  );
}
