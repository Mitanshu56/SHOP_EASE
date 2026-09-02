import { useEffect, useState } from "react";
import Button from "../components/Button";
import { getProductById } from "../services/products";
import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function ProductDetail({
  productId,
  onBackToShop,
}) {

    const { dispatch } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProductById(productId);

      setProduct(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-center text-gray-500">
          Loading product...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center">

        <p className="mb-4 text-red-500">
          {error}
        </p>

        <div className="flex justify-center gap-3">

          <Button
            variant="primary"
            onClick={fetchProduct}
          >
            Retry
          </Button>

          <Button
            variant="secondary"
            onClick={onBackToShop}
          >
            Back to Catalog
          </Button>

        </div>

      </main>
    );
  }


  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: product,
    });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">

      <div className="grid gap-8 md:grid-cols-2">



        <div className="flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-10">

          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />

        </div>



        <div className="flex flex-col gap-4">

          <span className="text-xs font-medium uppercase tracking-wide text-indigo-500">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold text-gray-900">
            {product.title}
          </h1>



          <div className="flex items-center gap-1 text-sm text-gray-500">

            <span className="text-amber-500">
              ★
            </span>

            <span>
              {product.rating?.rate ?? "—"}
            </span>

            <span className="text-gray-400">
              ({product.rating?.count ?? 0} reviews)
            </span>

          </div>



          <p className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>



          <p className="text-sm leading-relaxed text-gray-600">
            {product.description}
          </p>



          <div className="mt-4 flex gap-3">

            <Button onClick={handleAddToCart}
              variant="primary"
              className="px-6 py-3"
            >
              Add to Cart
            </Button>

            <Button
              variant="secondary"
              className="px-6 py-3"
              onClick={onBackToShop}
            >
              Back to Catalog
            </Button>

          </div>

        </div>

      </div>

    </main>
  );
}