import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../utils/api';
import { toast } from 'react-toastify';


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

export const selectCartItemCount = (state) => state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        loading: false,
        error: null,
    },
    reducers: {
        
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
            });
    },
});

export default cartSlice.reducer;
