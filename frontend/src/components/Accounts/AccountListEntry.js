import { useDispatch } from 'react-redux';
import { SetCurrentAccount } from '../../store/accounts/syncs';

import { SetCurrentModal } from '../../store/modal';
import { ShowModal } from '../../store/UX';
import ConfirmDelete from './ConfirmDelete';

export default function AccountListEntry ({ account }) {
  const dispatch = useDispatch();

  const onSelectAccount = () => dispatch(SetCurrentAccount(account));

  const onDelete = () => {
    dispatch(SetCurrentModal(ConfirmDelete));
    dispatch(ShowModal());
  };

  return (
    <div
      className='entry-item'
      onClick={onSelectAccount}
    >
      <div className='account-name'>
        {account.name}
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
