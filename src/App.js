import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './redux/reducers/todoReducers';
import TableComponent from './Components/Table';
function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            alignItems: 'center',
          }}
        >
          <div class='spinner-border' role='status'></div>
        </div>
      ) : (
        <div style={{ marginTop: '10px' }}>
          <TableComponent />
        </div>
      )}
    </div>
  );
}

export default App;
