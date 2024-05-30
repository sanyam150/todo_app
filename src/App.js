import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './redux/reducers/todoReducers';
import TableComponent from './Components/Table';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <div>
      <TableComponent />
    </div>
  );
}

export default App;
