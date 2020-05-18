import React, { useState, useEffect, useContext } from 'react';

import AuthContext from '../../context/authContext.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import Order from './order.jsx';
import SectionTitle from '../layout/sectionTitle.jsx';
import OrderStatusButton from './orderStatusButton.jsx';
import api from '../../config/api.jsx';

const LOAN_PERIOD = 30; // days

const pad2 = (int) => {
  if (int / 10 < 1) return `0${int.toString()}`;
  return int.toString();
};

const formatDate = (date) => {
  if (typeof date === 'string') return date;
  const year = date.getFullYear();
  const month = date.getMonth();
  const dateNum = date.getDate();

  const hours = pad2(date.getHours());
  const minutes = pad2(date.getMinutes());
  const seconds = pad2(date.getSeconds());

  return `${dateNum}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

const statusType = {
  Finished: 'Finished',
  Cancel: 'Finished',
  Loaned: 'Loaned',
  Expired: 'Loaned',
  'Ready-to-take': 'Active',
  'In-progress': 'Active',
};

const filter = (statusFilter, idFilter) => (orders) => orders.filter((order) => {
  let result = true;
  if (statusType[order.status] !== statusFilter) {
    result = false;
  }
  const checkStartId = new RegExp(`^${idFilter}.*`);
  if (!order.id.toString().match(checkStartId)) {
    result = false;
  }
  return result;
});

const OrderList = () => {
  const { role } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState('Active'); // other options are active and loaned
  const [idFilter, setIdFilter] = useState('');

  const { isLoaded, data: orders, update } = useFetch(api.orders());

  const UPDATE_INTERVAL = 5000;
  useEffect(() => {
    const timer = setInterval(() => {
      if (update) update();
    }, UPDATE_INTERVAL);
    return () => { clearInterval(timer); };
  });

  if (!isLoaded) return <div></div>;

  const sortedOrders = orders
    .map((order) => {
      const date = new Date(order.createAt);
      // eslint-disable-next-line no-restricted-globals
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
      order.createAt = formatDate(order.createAt);
      return order;
    });

  const curFilter = filter(statusFilter, idFilter);

  return (
    <div className='OrderList'>
      <input className='searchInput' onChange={(e) => {
        setIdFilter(e.target.value);
      }} />
      <div className='button-container'>
        <OrderStatusButton curStatus={statusFilter} onClick={setStatusFilter} status='Active' />
        <OrderStatusButton curStatus={statusFilter} onClick={setStatusFilter} status='Loaned' />
        <OrderStatusButton curStatus={statusFilter} onClick={setStatusFilter} status='Finished' />
      </div>
      <SectionTitle text='Orders' />
      <table>
        <thead>
          <tr>
            <th> ID</th>
            {role === 'librarian' && <th> Customer </th>}
            <th> Book </th>
            <th> Created at </th>
            {role === 'customer' && <th> Return date </th>}
            <th> Status </th>
            {role === 'librarian' && <th colSpan='2'> Action </th>}
            {role === 'customer' && <th> Comment </th>}
          </tr>
        </thead>
        <tbody>
          {(curFilter(sortedOrders)).map((order) => <Order
              key={order.id}
              order={order}
              role={role}
              setStatus={update}
            />)}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
