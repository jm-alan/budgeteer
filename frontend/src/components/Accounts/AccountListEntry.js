import { useDispatch } from 'react-redux';
import { SetCurrentAccount } from '../../store/accounts';

import { SetCurrentModal } from '../../store/modal';
import { ShowModal } from '../../store/UX';
import ConfirmDelete from './ConfirmDelete';

export default function AccountListEntry ({ account }) {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(SetCurrentAccount(account));
    dispatch(SetCurrentModal(ConfirmDelete));
    dispatch(ShowModal());
  };
  return (
    <div className='account-list-item'>
      <div className='account-name'>
        {account.name}
      </div>
      <button
        className='account-delete'
        onClick={onDelete}
      >
        -
      </button>
    </div>
  );
}
