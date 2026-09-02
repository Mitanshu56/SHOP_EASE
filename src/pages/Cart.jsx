
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../store/cartSlice";
import Button from "../components/Button";
import CartItem from "../components/CartItem";

export default function Cart({
  onBackToShop,
  onProceedToCheckout,
}) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const cartItemAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">

      {/* Continue Shopping */}
      <button
        type="button"
        onClick={onBackToShop}
        className="mb-4 text-sm font-medium text-indigo-600 hover:text-indigo-800"
      >
        ← Continue Shopping
      </button>

      {/* Title */}
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Your Cart
      </h1>

      {/* Cart Items */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {cart.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            Your cart is empty.
          </p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>

      {/* Subtotal */}
      <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
        <span className="text-base font-semibold text-gray-700">
          Subtotal
        </span>

        <span className="text-xl font-bold text-gray-900">
          ${cartItemAmount.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <div className="mt-6 flex justify-end">
        <Button
          variant="primary"
          className="px-6 py-3"
          disabled={cart.length === 0}
          onClick={onProceedToCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>

    </main>
  );
}

