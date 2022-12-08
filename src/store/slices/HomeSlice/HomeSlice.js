import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const getProducts = createAsyncThunk('home/getProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://63641a7f8a3337d9a2f16578.mockapi.io/products`);
    if (response.status !== 200) {
      throw new Error('Server Error!');
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
const HomeSlice = createSlice({
  name: 'home',
  initialState: {
    products: { pizzas: [], drinks: [], allProducts: [] },
    productName: '',
    navTitle: '',
    error: null,
    status: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProductName(state, action) {
      state.productName = action.payload;
    },
    onChange(state, action) {
      if (action.payload.label === 'По убыванию цены') {
        state.products = {
          ...state.products,
          pizzas: state.products.allProducts?.sort(
            (a, b) => b.prices?.map((el) => el.price)[0] - a.prices?.map((l) => l.price)[0],
          ),
        };
      } else {
        state.products = {
          ...state.products,
          pizzas: state.products.allProducts?.sort(
            (a, b) => a.prices?.map((el) => el.price)[0] - b.prices?.map((l) => l.price)[0],
          ),
        };
      }
    },
    setNavTitle(state, action) {
      state.navTitle = action.payload;
    },
  },

  extraReducers: {
    [getProducts.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.products = {
        pizzas: action.payload.filter((el) => el.text),
        drinks: action.payload.filter((el) => !el.text),
        allProducts: action.payload,
      };
    },
    [getProducts.rejected]: (state,action) => {
      state.status = 'rejected';
      state.error = null;
    },
  },
});
export const {
  setProducts,
  setProductName,
  setAdditionOption,
  setWithoutOption,
  setAmountProducts,
  onChange,
  setNavTitle,
} = HomeSlice.actions;
export default HomeSlice.reducer;
