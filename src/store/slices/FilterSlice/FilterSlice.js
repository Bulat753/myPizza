import { createSlice } from '@reduxjs/toolkit';
const FilterSlice = createSlice({
  name: 'filter',
  initialState: {
    options: [
      { value: 'по убыванию цены', label: 'По убыванию цены' },
      { value: 'по возрастанию цены', label: 'По возрастанию цены' },
    ],
    search: '',
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});
export const {setSearch} = FilterSlice.actions;
export default FilterSlice.reducer;
