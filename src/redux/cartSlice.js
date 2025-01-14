import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../utils/api';
import { toast } from 'react-hot-toast';


// Async thunk to handle adding to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ bookId, quantity }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/cart', { bookId, quantity });
            toast.success(data.msg || "Item added to cart");
            return data.cartItems;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get('/cart');
            return data.cartItems;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Async thunk to delete a cart item
export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (cartId, { rejectWithValue }) => {
        try {
            const { data } = await API.delete(`/cart`, { data: { cartId } });
            toast.success(data.message || "Item removed from cart");
            return cartId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity',
    async ({ cartId, quantity }, { rejectWithValue }) => {
      try {
        const { data } = await API.put('/cart', { cartId, quantity });
        toast.success(data.message || "Quantity updated");
        return { cartId, quantity };
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || error.message
        );
      }
    }
  );
  
export const selectCartItemCount = (state) => state.cart.cartItems.reduce((acc, item) => acc + 1, 0);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        loading: false,
        error: null,
    },
    reducers: {
        removeItemOptimistically: (state, action) => {
            state.cartItems = action.payload;
        },
        revertItemDeletion: (state, action) => {
            state.cartItems.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;  
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = state.cartItems.filter(
                    (item) => item._id !== action.payload
                );
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
              })
              .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                const { cartId, quantity } = action.payload;
                const item = state.cartItems.find((item) => item.cartId === cartId);
                if (item) {
                  item.quantity = quantity;
                }
              })
              .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { removeItemOptimistically } = cartSlice.actions;
export default cartSlice.reducer;
