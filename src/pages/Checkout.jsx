import Button from '../components/Button';
import { dummyProducts } from '../services/dummyProducts';

// Static markup only — no controlled inputs, validation, useRef auto-focus,
// or the order-confirmation Modal/portal yet. All of that is Phase 5.
// This page should also become auth-protected in Phase 7 (ProtectedRoute).
const dummyCartItems = [
  { ...dummyProducts[0], quantity: 1 },
  { ...dummyProducts[1], quantity: 2 },
];

export default function Checkout() {
  const total = dummyCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <form className="md:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-800">Shipping Details</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Full Name
              <input
                type="text"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Email
              <input
                type="email"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm text-gray-600">
            Address
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-gray-600">
              City
              <input
                type="text"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Postal Code
              <input
                type="text"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-gray-800">Payment (dummy)</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Card Number
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Expiry
              <input
                type="text"
                placeholder="MM/YY"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>

          <Button type="submit" variant="primary" className="mt-4 self-start px-6 py-3">
            Place Order
          </Button>
        </form>

        <aside className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
          {dummyCartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-600">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-2 flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
