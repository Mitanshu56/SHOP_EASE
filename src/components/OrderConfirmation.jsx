import { createPortal } from "react-dom";
import Button from "./Button";

export default function OrderConfirmation({ onClose }) {
  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Order Confirmed!
        </h2>

        <p className="mt-2 text-gray-600">
          Thank you for your order. Your order has been
          placed successfully.
        </p>

        <Button
          variant="primary"
          className="mt-6 px-6 py-3"
          onClick={onClose}
        >
          Continue Shopping
        </Button>

      </div>
    </div>,
    modalRoot
  );
}