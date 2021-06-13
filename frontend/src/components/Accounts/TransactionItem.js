import { useDispatch, useSelector } from 'react-redux';

export default function TransactionItem ({ item }) {
  const dispatch = useDispatch();

  const current = useSelector(state => state.accounts.current);

  const onDelete = () => {};
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
    </div>
  );
}
