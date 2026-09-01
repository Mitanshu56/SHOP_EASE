import { useContext } from "react";
import CartContext from "../context/CartContext";
import Button from "./Button";

export default function ProductCard({
  product,
  onViewDetails,
}) {
  const { dispatch } = useContext(CartContext);

  const {
    title,
    price,
    category,
    image,
    rating,
  } = product;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: product,
    });
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">

      <button
        type="button"
        onClick={() => onViewDetails?.(product)}
        className="block aspect-square w-full overflow-hidden bg-gray-50"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain p-6 transition-transform hover:scale-105"
        />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">

        <span className="text-xs font-medium uppercase tracking-wide text-indigo-500">
          {category}
        </span>

        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
          {title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span className="text-amber-500">★</span>
          <span>{rating?.rate ?? "—"}</span>
          <span className="text-gray-400">
            ({rating?.count ?? 0})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">

          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>

          <Button
            variant="primary"
            className="px-3 py-1.5"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

        </div>

      </div>
    </div>
  );
}