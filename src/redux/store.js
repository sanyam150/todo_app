import { configureStore } from '@reduxjs/toolkit';
import todoReducers from './reducers/todoReducers';

const store = configureStore({
  reducer: {
    todos: todoReducers,
  },
});

export default store;
