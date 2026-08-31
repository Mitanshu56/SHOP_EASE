import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Phase 1 renders only the Home page — no routing yet (that's Phase 7's job).
// The other pages (ProductDetail, Cart, Checkout, Login, Signup, Orders,
// NotFound) already exist under src/pages/, fully built and ready to be
// dropped into <Routes> once React Router is installed and wired up yourself.
// Feel free to swap the import below to preview any other page in the
// meantime — just don't wire up routing until Phase 7.
export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar cartItemCount={0} />
      <div className="flex-1">
        <Home />
      </div>
      <Footer />
    </div>
  );
}
