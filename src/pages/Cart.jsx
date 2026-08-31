import Button from "../components/Button";
import CartItem from "../components/CartItem";

export default function Cart({
  cart,
  removeFromCart,
  updateQuantity,
  cartItemAmount,
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Your Cart</h1>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {cart.length === 0 ? (
          <p className="py-12 text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
              onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))
        )}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
        <span className="text-base font-semibold text-gray-700">Subtotal</span>

        <span className="text-xl font-bold text-gray-900">
          ${cartItemAmount.toFixed(2)}
        </span>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="primary" className="px-6 py-3">
          Proceed to Checkout
        </Button>
      </div>
    </main>
  );
}

// Static placeholder cart items, built from the first two dummy products.
// Phase 2 replaces this with real cart state (useState), Phase 3 migrates it
// to CartContext + useReducer, and Phase 6 migrates it again to Redux Toolkit.
