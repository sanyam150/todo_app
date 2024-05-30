import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos as fetchTodosAPI } from '../../api';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const todos = await fetchTodosAPI(10);
  return todos;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    loading: false,
    todos: [],
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = '';
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.error.message;
      });
  },
});

export default todoSlice.reducer;
