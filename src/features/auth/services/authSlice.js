import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from './authService';

export const login = createAsyncThunk('auth/login', async (data) => {
  const response = await loginRequest(data); // Usa el servicio
  localStorage.setItem('token', response.token); // Guarda el token
  return response; // Devuelve { token, user }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('authToken') || null,
    user: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
