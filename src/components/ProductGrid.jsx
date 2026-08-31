import ProductCard from './ProductCard';

export default function ProductGrid({ products, onAddToCart, onViewDetails }) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-gray-500">No products match your filters.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
