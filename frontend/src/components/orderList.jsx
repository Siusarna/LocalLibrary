import React from 'react';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import useFetch from '../hooks/useFetch';
import Order from './order';

const LOAN_PERIOD = 30; //days

const formatDate = (date) => {
  if (typeof date === 'string') return date;
  const year = date.getFullYear();
  const month = date.getMonth();
  const dateNum = date.getDate();

  return `${dateNum}.${month}.${year}`
}

const OrderList = (props) => {
  const { role } = useContext(AuthContext);
  const { isLoaded, data: orders } =
    useFetch('https://fathomless-ravine-92681.herokuapp.com/api/orders');
  if (!isLoaded) return <div></div>;

  const sortedOrders = orders
    .map((order) => {
      const date = new Date(order.createAt)
      order.createAt = !isNaN(date) ? date : order.createAt;
      return order;
    })
    .sort((a, b) => a.createAt < b.createAt)
    .map((order) => {
      if (role === 'customer' && !order.returnAt) {
        const returnAt = new Date(order.createAt);
        returnAt.setDate(returnAt.getDate() + LOAN_PERIOD);
        order.returnAt = formatDate(returnAt);
      }
      order.createAt = formatDate(order.createAt)
      return order;
    })

  return <div className='OrderList'>
    <table>
      <thead>
        <tr>
          <th> ID</th>
          {role === 'librarian' && <th> Customer </th>}
          <th> Book </th>
          <th> Created at </th>
          {role === 'customer' && <th> Return date </th>}
          <th> Status </th>
          {role === 'librarian' && <th> Action </th>}
          <th> Comment </th>
        </tr>
      </thead>
      <tbody>
        {sortedOrders.map(order => <Order key={order.id} order={order} role={role} />)}
      </tbody>
    </table>
  </div>
};

export default OrderList;
