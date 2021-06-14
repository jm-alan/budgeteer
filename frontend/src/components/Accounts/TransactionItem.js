import { useDispatch, useSelector } from 'react-redux';
import { DeleteCommunalItem, DeletePersonalItem } from '../../store/accounts/asyncs';

export default function TransactionItem ({ item }) {
  const dispatch = useDispatch();

  const current = useSelector(state => state.accounts.current);

  const onDelete = () => {
    if (current.balance !== undefined) dispatch(DeletePersonalItem(current.id, item.id));
    else dispatch(DeleteCommunalItem(current.id, item.id));
  };

  return (
    <div
      className={`entry-item${
        item.income ? ' income' : ' expense'
      }`}
    >
      <div className='transaction-item-name'>
        {item.name}
      </div>
      <div className='transaction-item-amount'>
        {item.amount}
      </div>
      <button
        className='entry-delete'
        onClick={onDelete}
      >
        -
      </button>
    </div>
  );
}
