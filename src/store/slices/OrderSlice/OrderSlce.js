import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const getOrders = createAsyncThunk('cart/getOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://63641a7f8a3337d9a2f16578.mockapi.io/orders`);
    if (response.status !== 200) {
      throw new Error('Server Error!');
    }
    return response.data?.map((el) => el?.orders);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    status: null,
    error: null,
  },
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setUserPhone(state, action) {
      state.userPhone = action.payload;
    },
    setUserAddress(state, action) {
      state.userAddress = action.payload;
    },
    setAmountPerson(state, action) {
      state.amountPerson = action.payload;
    },

  },
  extraReducers: {
    [getOrders.pending]: (state) => {
      state.status = 'loading';
      state.error = null
    },
    [getOrders.fulfilled]: (state,action) => {
      state.status = 'resolved';
      state.orders = action.payload
    },
    [getOrders.rejected]: (state,action) => {
      state.status = 'rejected';
      state.error = action.payload
    },
  },
});
export const {
  setUserName,
  setUserPhone,
  setUserAddress,
  setAmountPerson,
} = OrderSlice.actions;
export default OrderSlice.reducer;
