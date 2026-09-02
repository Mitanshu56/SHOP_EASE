import { useContext, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import CartContext from "../context/CartContext";
import OrderConfirmation from "../components/OrderConfirmation";

export default function Checkout() {
  const { cart, cartItemAmount, dispatch } = useContext(CartContext);

  const nameRef = useRef(null);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    } else if (!/^\d{6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postal code must be 6 digits.";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (!formData.expiry.trim()) {
      newErrors.expiry = "Expiry date is required.";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Use MM/YY format.";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required.";
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 digits.";
    }

    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    console.log("orderdetails",formData)
    dispatch({
      type: "CLEAR_CART",
    });

    setOrderPlaced(true);
  };
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 md:col-span-2"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Shipping Details
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                Full Name
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </label>

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </label>

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Address
              <input
              required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </label>

            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                City
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </label>

              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                Postal Code
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </label>

              {errors.postalCode && (
                <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
              )}
            </div>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-gray-800">
            Payment (Dummy)
          </h2>

          <div>
            <label className="flex flex-col gap-1 text-sm text-gray-600">
              Card Number
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="4242 4242 4242 4242"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </label>

            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                Expiry
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </label>

              {errors.expiry && (
                <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>
              )}
            </div>

            <div>
              <label className="flex flex-col gap-1 text-sm text-gray-600">
                CVV
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </label>

              {errors.cvv && (
                <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="mt-4 self-start px-6 py-3"
          >
            Place Order
          </Button>
        </form>

        <aside className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>

          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-3 text-sm text-gray-600"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>

                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          )}

          <div className="mt-2 flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
            <span>Total</span>

            <span>${cartItemAmount.toFixed(2)}</span>
          </div>
        </aside>
      </div>

      {orderPlaced && (
        <OrderConfirmation onClose={() => setOrderPlaced(false)} />
      )}
    </main>
  );
}
