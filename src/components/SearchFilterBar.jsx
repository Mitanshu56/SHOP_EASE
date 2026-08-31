// Fully static inputs — no state/handlers wired yet.
// Phase 2 wires these to useState (search, category, price range) and,
// later, Phase 4 debounces the search input.
export default function SearchFilterBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />

      <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none">
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="accessories">Accessories</option>
      </select>

      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min $"
          className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
        <span className="text-gray-400">–</span>
        <input
          type="number"
          placeholder="Max $"
          className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
