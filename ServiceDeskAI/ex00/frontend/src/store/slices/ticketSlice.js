import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from '../../services/ticketService';

const initialState = {
  tickets: [],
  ticket: null,
  statistics: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get all tickets
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ticketService.getTickets(filters, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single ticket
export const getTicket = createAsyncThunk(
  'tickets/getOne',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ticketService.getTicket(id, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update ticket
export const updateTicket = createAsyncThunk(
  'tickets/update',
  async ({ id, data }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ticketService.updateTicket(id, data, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete ticket
export const deleteTicket = createAsyncThunk(
  'tickets/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await ticketService.deleteTicket(id, token);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add message to ticket
export const addMessage = createAsyncThunk(
  'tickets/addMessage',
  async ({ id, message }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ticketService.addMessage(id, message, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get statistics
export const getStatistics = createAsyncThunk(
  'tickets/getStatistics',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ticketService.getStatistics(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload.data;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.ticket = action.payload.data;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tickets.unshift(action.payload.data);
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.isSuccess = true;
        const index = state.tickets.findIndex(t => t._id === action.payload.data._id);
        if (index !== -1) {
          state.tickets[index] = action.payload.data;
        }
        if (state.ticket && state.ticket._id === action.payload.data._id) {
          state.ticket = action.payload.data;
        }
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter(t => t._id !== action.payload);
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload.data;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
