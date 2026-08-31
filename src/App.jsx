import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: quantity,
            }
          : item
      )
    );
  };

  const cartItemTotal = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartItemAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar cartItemCount={cartItemTotal} />

      <div className="flex-1">
        <Home
          addToCart={addToCart}
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          cartItemAmount={cartItemAmount}
        />
      </div>

      <Footer />
    </div>
  );
}