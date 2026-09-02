// import { createContext, useEffect, useReducer } from "react";

// import { cartReducer, initialCartState } from "./cartReducer";

// import useLocalStorage from "../hooks/useLocalStorage";

// const CartContext = createContext(null);

// export function CartProvider({ children }) {
//   const [savedCart] = useLocalStorage("cart", initialCartState);

//   const [cart, dispatch] = useReducer(cartReducer, savedCart);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const cartItemTotal = cart.reduce((total, item) => total + item.quantity, 0);

//   const cartItemAmount = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0,
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         dispatch,
//         cartItemTotal,
//         cartItemAmount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartContext;
