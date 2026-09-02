// export const initialCartState = [];

// export function cartReducer(state, action) {
//   switch (action.type) {
//     case "ADD_ITEM": {
//       const product = action.payload;

//       const existingItem = state.find((item) => item.id === product.id);

//       if (existingItem) {
//         return state.map((item) =>
//           item.id === product.id
//             ? {
//                 ...item,
//                 quantity: item.quantity + 1,
//               }
//             : item,
//         );
//       }

//       return [
//         ...state,
//         {
//           ...product,
//           quantity: 1,
//         },
//       ];
//     }

//     case "REMOVE_ITEM":
//       return state.filter((item) => item.id !== action.payload);

//     case "UPDATE_QUANTITY": {
//       const { productId, quantity } = action.payload;

//       if (quantity <= 0) {
//         return state.filter((item) => item.id !== productId);
//       }

//       return state.map((item) =>
//         item.id === productId
//           ? {
//               ...item,
//               quantity,
//             }
//           : item,
//       );
//     }

//     case "CLEAR_CART":
//       return [];

//     default:
//       return state;
//   }
// }
