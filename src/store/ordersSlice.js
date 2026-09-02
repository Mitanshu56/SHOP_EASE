
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/orders";

// Place a new order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ userId, items, total, shipping }, thunkAPI) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          items,
          total,
          shipping,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.error || "Failed to place order"
        );
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch user's past orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(
        `${API_URL}?userId=${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.orders.push(action.payload);
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to place order";
      })


      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch orders";
      });
  },
});

export default ordersSlice.reducer;

