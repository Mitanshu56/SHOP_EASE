import ProductGrid from '../components/ProductGrid';
import SearchFilterBar from '../components/SearchFilterBar';
import { dummyProducts } from '../services/dummyProducts';

// Static for now: renders the hardcoded dummyProducts list via props.
// Phase 2 adds useState for cart + filtering. Phase 5 replaces dummyProducts
// with a real fetch (loading/error/success states) from services/products.js.
export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Shop the Catalog</h1>
      <SearchFilterBar />
      <ProductGrid products={dummyProducts} />
    </main>
  );
}
