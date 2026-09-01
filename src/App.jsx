import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

export default function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">

      <Navbar
        onCartClick={() => setShowCart(true)}
      />

      <div className="flex-1">
        {showCart ? (
          <Cart
            onBackToShop={() => setShowCart(false)}
          />
        ) : (
          <Home />
        )}
      </div>

      <Footer />

    </div>
  );
}