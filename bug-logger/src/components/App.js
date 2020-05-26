import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';

const App = () => {
  const [logs, setLogs] = useState([
    {
      _id: 1,
      text: 'This is log one',
      priority: 'low',
      user: 'Zach',
      created: new Date().toString(0),
    },
    {
      _id: 2,
      text: 'This is log two',
      priority: 'high',
      user: 'Jeffrey',
      created: new Date().toString(0),
    },
    {
      _id: 3,
      text: 'This is log three',
      priority: 'low',
      user: 'Doppledeaner',
      created: new Date().toString(0),
    },
  ]);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success',
  });

  function addItem(item) {
    if (!item.text || !item.user || !item.priority) {
      return showAlert('Please enter all fields', 'danger');
    }

    item._id = Math.floor(Math.random() * 90000) + 10000;
    item.created = new Date().toString();
    setLogs([...logs, item]);
    showAlert('Item as been added');
  }

  function deleteItem(_id) {
    setLogs(logs.filter(item => item._id !== _id));
    showAlert('Item has been removed');
  }

  function showAlert(message, variant = 'success', seconds = 3000) {
    setAlert({ show: true, message, variant });

    setTimeout(() => {
      setAlert({ show: false, message: '', variant: 'success' });
    }, seconds);
  }

  return (
    <Container>
      <AddLogItem addItem={addItem} />
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <LogItem key={log._id} {...log} deleteItem={deleteItem} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
