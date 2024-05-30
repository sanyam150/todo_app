import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

const TableComponent = () => {
  const status = useSelector((state) => state.todos.todos);

  const [rows, setRows] = useState([
    { id: uuidv4(), input1: '1', input2: '10', text: '' },
  ]);

  const handleAddRow = () => {
    const newRows = rows.map((row, index) => {
      if (index === 0) {
        return { ...row, input1: '1', input2: '', text: '' };
      }
      return { ...row, input1: '', input2: '', text: '' };
    });

    const newRow = {
      id: uuidv4(),
      input1: '',
      input2: '',
      text: '',
    };

    newRows.push(newRow);

    if (newRows.length === 2) {
      newRows[newRows.length - 1].input2 = '10';
    } else {
      newRows[newRows.length - 2].input2 = '';
      newRows[newRows.length - 1].input2 = '10';
    }

    setRows(newRows);
  };

  const handleInputChange = (id, inputKey, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [inputKey]: value } : row))
    );
  };

  const handleDeleteRow = (id) => {
    let newRows = rows.filter((row) => row.id !== id);

    if (newRows.length === 1) {
      newRows = [{ ...rows, input1: '1', input2: '10', text: '' }];
    } else {
      newRows = newRows.map((row, index) => {
        if (index === 0) {
          return { ...row, input1: '1', input2: '', text: '' };
        } else if (index === newRows.length - 1) {
          return { ...row, input1: '', input2: '10', text: '' };
        }
        return { ...row, input1: '', input2: '', text: '' };
      });
    }

    setRows(newRows);
  };

  const validateRows = (rows) => {
    let inRange = true;
    let isOrder = true;
    let isEmpty = false;
    let array = [];

    rows.forEach((data, index) => {
      if (data.input1 === '' || data.input2 === '') {
        isEmpty = true;
      }
      if (
        data.input1 < 0 ||
        data.input2 < 0 ||
        data.input1 > 10 ||
        data.input2 > 10 ||
        (index === rows.length - 1 && Number(data.input1) === 10)
      ) {
        inRange = false;
      }

      array.push(Number(data.input1));
      array.push(Number(data.input2));
    });

    let updatedArray = array.slice(1, -1);

    for (let i = 0; i < updatedArray.length; i += 2) {
      if (updatedArray[i + 1] - updatedArray[i] !== 1) {
        isOrder = false;
        break;
      }
    }

    return { inRange, isOrder, isEmpty };
  };

  const handleInformationStatus = (rows, obj2) => {
    return rows.map((item) => {
      const input1 = Number(item.input1);
      const input2 = Number(item.input2);
      const completeStatus = obj2
        .filter((obj) => obj.id >= input1 && obj.id <= input2)
        .map((obj) => ` (${obj.id}) ${obj.completed}`)
        .join(',');
      return { ...item, text: completeStatus };
    });
  };

  const handleStatus = () => {
    const { inRange, isOrder, isEmpty } = validateRows(rows);
    if (isEmpty) {
      alert(`Input fields must not be empty`);
      return;
    }
    if (!inRange) {
      alert(
        `remove numbers that are less than 0 and greater than 10 from the input fields`
      );
      return;
    }
    if (!isOrder) {
      alert(`Input fields are having non consecutive values`);
      return;
    }
    let updatedRows = handleInformationStatus(rows, status);
    setRows(updatedRows);
  };

  return (
    <div className='container'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Groups</th>
            <th>Todos Status</th>
            <th>Delete Group</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td style={{ display: 'flex' }}>
                <input
                  type='Number'
                  className='form-control'
                  value={row.input1}
                  disabled={index === 0}
                  onChange={(e) =>
                    handleInputChange(row.id, 'input1', e.target.value)
                  }
                  style={{ marginRight: '10px' }}
                />
                <input
                  type='Number'
                  className='form-control mt-2'
                  value={row.input2}
                  disabled={index === rows.length - 1}
                  onChange={(e) =>
                    handleInputChange(row.id, 'input2', e.target.value)
                  }
                />
              </td>
              <td>
                <span>{row.text}</span>
              </td>
              <td>
                {rows.length > 1 && (
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDeleteRow(row.id)}
                    disabled={index === 0}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className='btn btn-primary'
        onClick={handleAddRow}
        disabled={rows.length > 4}
      >
        Add Row
      </button>
      <button
        className='btn btn-primary'
        onClick={handleStatus}
        disabled={status.length === 0}
        style={{ marginLeft: '10px' }}
      >
        Show Status
      </button>
    </div>
  );
};

export default TableComponent;
