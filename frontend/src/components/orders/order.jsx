import React from 'react';
import { Link } from 'react-router-dom';
import Status from './status.jsx';
import ConfirmOrderButton from './confirmOrderButton.jsx';
import ConfirmationCodeButton from './confirmationCodeButton.jsx';
import FinnishOrderButton from './finishOrderButton.jsx';

const Order = (props) => {
  const {
    id, bookId, title, createAt, returnAt, status, comment,
    userFirstName, userLastName,
  } = props.order;
  const { setStatus } = props;
  // const [curStatus, setStatus] = useState(status);
  const fullName = `${userFirstName} ${userLastName}`;
  return <tr>
    <td>{id}</td>
    {userFirstName && <td>{fullName}</td>}
    <td><Link to={`/books/${bookId}`}>{title}</Link></td>
    <td>{createAt}</td>
    {returnAt && <td>{returnAt}</td>}
    <td><Status status={status} returnAt={returnAt} /></td>
    {(props.role === 'librarian' && status === 'In-progress')
      && <>
        <td colSpan='1'>
          <ConfirmOrderButton id={id} onSuccess={() => setStatus('Ready-to-take')} />
        </td>
        <td colSpan='1'>
          <Link to={`/orders/reject/${id}`}><div className='linkBox'>Reject</div></Link>
        </td>
      </>}
    {props.role === 'librarian' && status === 'Ready-to-take'
      && <td colSpan='2'><ConfirmationCodeButton id={id} /></td>}
    {props.role === 'librarian' && status === 'Loaned'
      && <td colSpan='2'><FinnishOrderButton id={id} onSuccess={() => setStatus('Finished')} /></td>}
    {props.role === 'customer' && <td>{comment}</td>}
  </tr>;
};

export default Order;
