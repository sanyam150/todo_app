import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async (limit = 10) => {
  try {
    const response = await axios.get(API_URL);
    return response.data.slice(0, limit);
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};
