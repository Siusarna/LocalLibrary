import React from 'react';
import { Link } from 'react-router-dom';

const Order = (props) => {
  const { id, bookId, title, createAt, returnAt, status, comment, 
    userFirstName, userLastName } = props.order;
  const fullName = userFirstName + ' ' + userLastName;
  return <tr>
    <td>{id}</td>
    {fullName && <td>{fullName}</td>}
    <td><Link to={`/books/${bookId}`}>{title}</Link></td>
    <td>{createAt}</td>
    {returnAt && <td>{returnAt}</td>}
    <td>{status}</td>
    {props.role === 'librarian' && <td>action</td>}
    <td>{comment}</td>
  </tr>
};

export default Order;