import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CartIcon from "./CartIcon";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const cart = useSelector((state) => state.cart);

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const cartItemTotal = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-indigo-600"
        >
          ShopEase
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">

          {/* Home */}
          <li>
            <Link
              to="/"
              className="hover:text-indigo-600"
            >
              Home
            </Link>
          </li>

          {/* Logged-in links */}
          {user ? (
            <>
              <li>
                <Link
                  to="/orders"
                  className="hover:text-indigo-600"
                >
                  My Orders
                </Link>
              </li>

              <li>
                <span className="text-gray-500">
                  Hi, {user.name}
                </span>
              </li>

              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hover:text-indigo-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            /* Logged-out links */
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-indigo-600"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="hover:text-indigo-600"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}

        </ul>

        {/* Cart */}
        <Link
          to="/cart"
          aria-label="Cart"
        >
          <CartIcon itemCount={cartItemTotal} />
        </Link>

      </nav>
    </header>
  );
}