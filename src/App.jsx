import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleViewDetails = (product) => {
    setShowCart(false);
    setShowCheckout(false);
    setSelectedProductId(product.id);
  };

  const handleCartClick = () => {
    setSelectedProductId(null);
    setShowCheckout(false);
    setShowCart(true);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setSelectedProductId(null);
    setShowCheckout(true);
  };

  const handleBackToShop = () => {
    setShowCart(false);
    setShowCheckout(false);
    setSelectedProductId(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">

      <Navbar onCartClick={handleCartClick} />

      <div className="flex-1">

        {showCheckout ? (
          <Checkout onBackToShop={handleBackToShop} />

        ) : showCart ? (
          <Cart
            onBackToShop={handleBackToShop}
            onProceedToCheckout={handleCheckout}
          />

        ) : selectedProductId ? (
          <ProductDetail
            productId={selectedProductId}
            onBackToShop={handleBackToShop}
          />

        ) : (
          <Home onViewDetails={handleViewDetails} />
        )}

      </div>

      <Footer />

    </div>
  );
}