
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../store/ordersSlice";

const STATUS_STYLES = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-amber-100 text-amber-700",
};

export default function Orders() {
  const dispatch = useDispatch();

  const {
    orders,
    loading,
    error,
  } = useSelector((state) => state.orders);


  const userId = "demo-user";

  useEffect(() => {
    dispatch(fetchOrders(userId));
  }, [dispatch]);

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-center text-gray-500">
          Loading orders...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="mb-4 text-red-500">
          {error}
        </p>

        <button
          type="button"
          onClick={() => dispatch(fetchOrders(userId))}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">
                  {order.id}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    STATUS_STYLES[order.status] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Date */}
              <p className="mt-1 text-sm text-gray-500">
                Placed on{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>

              {/* Items */}
              <div className="mt-3 flex flex-col gap-1 border-t border-gray-100 pt-3">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.productId}-${index}`}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>

                    <span>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-3 flex justify-end border-t border-gray-100 pt-3 text-sm font-bold text-gray-900">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

