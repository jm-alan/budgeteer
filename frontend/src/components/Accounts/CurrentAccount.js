import { useDispatch, useSelector } from 'react-redux';

import NewItem from './NewItem';
import { SetCurrentModal } from '../../store/modal';
import { ShowModal } from '../../store/UX';
import TransactionItem from './TransactionItem';

export default function CurrentAccount () {
  const dispatch = useDispatch();

  const current = useSelector(state => state.accounts.current);

  const popNewItem = () => {
    dispatch(SetCurrentModal(NewItem));
    dispatch(ShowModal());
  };

  return current && (
    <div className='subcontainer current-account'>
      <div className='subcontainer current-account-header'>
        <div className='subcontainer current-account-name'>
          {current.name}
        </div>
        {(current.balance && (
          <div className='subcontainer current-account-balance'>
            ${current.balance}
          </div>
        )) ?? null}
        <div className='subcontainer current-account-new-item'>
          <button
            className='new-item'
            onClick={popNewItem}
          >+ New Item
          </button>
        </div>
      </div>
      <div className='subcontainer current-account-transaction-items'>
        {current.Items.map((item, idx) => (
          <TransactionItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}
