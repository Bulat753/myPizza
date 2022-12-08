import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './slices/CartSlice/CartSlice';
import FilterSlice from './slices/FilterSlice/FilterSlice';
import HomeSlice from './slices/HomeSlice/HomeSlice';
import OrderSlce from './slices/OrderSlice/OrderSlce';
export default configureStore({
  reducer: {
    home: HomeSlice,
    filter: FilterSlice,
    cart: CartSlice,
    order: OrderSlce,
  },
});
