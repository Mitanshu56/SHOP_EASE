import { useSelector } from "react-redux";
import CartIcon from "./CartIcon";

export default function Navbar({ onCartClick }) {
  const cart = useSelector((state) => state.cart);


  const cartItemTotal = cart.reduce(
  (total, item) => total + item.quantity,
  0
);
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="text-xl font-bold text-indigo-600">
          ShopEase
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <li>
            <a href="#" className="hover:text-indigo-600">
              Home
            </a>
          </li>
    {/*not working now  */}
          <li>
            <a href="#" className="hover:text-indigo-600">
              My Orders
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-indigo-600">
              Login
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-indigo-600">
              Sign Up
            </a>
          </li>
        </ul>

        <button type="button" aria-label="Cart" onClick={onCartClick}>
          <CartIcon itemCount={cartItemTotal} />
        </button>
      </nav>
    </header>
  );
}
