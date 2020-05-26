import React from 'react';
import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const LogItem = ({ _id, priority, text, user, created, deleteItem }) => {
  const setVariant = () => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'moderate':
        return 'warning';
      default:
        return 'success';
    }
  };

  return (
    <tr>
      <td>
        <Badge variant={setVariant(priority)} className="p-2">
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      </td>
      <td>{text}</td>
      <td>{user}</td>
      <td>
        <Moment format="MMM Do YYYY h:mm a">{new Date(created)}</Moment>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={e => deleteItem(_id)}>
          x
        </Button>
      </td>
    </tr>
  );
};

export default LogItem;
