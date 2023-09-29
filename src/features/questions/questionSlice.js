import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questionService from './questionService';

const initialState = {
  user: null,
  token: null,
};
export const createQuestion = createAsyncThunk(
  'events/createEvent',
  async formData => {
    try {
      return await questionService.createEvent(formData);
    } catch (error) {
      console.error(error);
    }
  }
);

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.events = action.payload;
    });
  },
});
export default questionSlice.reducer;
