import { createContext, useReducer } from "react";
import {
  cartReducer,
  initialCartState,
} from "./cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCartState
  );

  const cartItemTotal = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartItemAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        cartItemTotal,
        cartItemAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;