import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import officeService from '../../services/officeService';

const initialState = {
  offices: [],
  office: null,
  isLoading: false,
  isError: false,
  message: '',
};

export const getOffices = createAsyncThunk(
  'offices/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await officeService.getOffices(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createOffice = createAsyncThunk(
  'offices/create',
  async (officeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await officeService.createOffice(officeData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const officeSlice = createSlice({
  name: 'offices',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOffices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOffices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offices = action.payload.data;
      })
      .addCase(getOffices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createOffice.fulfilled, (state, action) => {
        state.offices.push(action.payload.data);
      });
  },
});

export const { reset } = officeSlice.actions;
export default officeSlice.reducer;
