import CartIcon from './CartIcon';

// Nav links are plain <a href="#"> placeholders — swap for React Router's
// <Link>/<NavLink> once routing is set up in Phase 7.
export default function Navbar({ cartItemCount = 0 }) {
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

        <a href="#" aria-label="Cart">
          <CartIcon itemCount={cartItemCount} />
        </a>
      </nav>
    </header>
  );
}
