import { createSlice } from '@reduxjs/toolkit';

const savedDarkMode = localStorage.getItem('darkMode') === 'true';

const initialState = {
  darkMode: savedDarkMode,
  sidebarOpen: false,
  currentView: 'all', // all, open, closed
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
  },
});

export const { toggleDarkMode, toggleSidebar, setCurrentView } = uiSlice.actions;
export default uiSlice.reducer;
