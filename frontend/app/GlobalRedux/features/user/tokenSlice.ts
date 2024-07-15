// Import necessary functions from Redux Toolkit
import { UserObject } from '@/modules/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    token: null
}
// Create a slice for text and boolean values
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    // Reducer to update the text value
    setToken: (state, action) => {
      state.token = action.payload;
    },

  },
});

// Export the actions and reducer
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;