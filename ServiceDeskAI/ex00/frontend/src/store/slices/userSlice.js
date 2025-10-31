import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const getUsers = createAsyncThunk(
  'users/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.getUsers(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/create',
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.createUser(userData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
