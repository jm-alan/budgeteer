import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CurrentAccount from './CurrentAccount';
import NewAccountForm from './New';
import {
  GetAllAccounts,
  GetAllCommunals,
  GetAllPersonals,
  UnloadAccounts
} from '../../store/accounts';
import { SetCurrentModal } from '../../store/modal';
import { ShowModal } from '../../store/UX';

export default function Accounts () {
  const dispatch = useDispatch();

  const list = useSelector(state => state.accounts.list);

  const selectAll = () => dispatch(GetAllAccounts());
  const selectPersonal = () => dispatch(GetAllPersonals());
  const selectCommunal = () => dispatch(GetAllCommunals());

  const popNewAccount = () => {
    dispatch(SetCurrentModal(NewAccountForm));
    dispatch(ShowModal());
  };

  useEffect(() => {
    dispatch(GetAllAccounts());
    return () => dispatch(UnloadAccounts());
  }, [dispatch]);

  return (
    <div className='container accounts-page'>
      <div className='subcontainer accounts-list sidebar'>
        <div className='subcontainer accounts-list-select'>
          <button
            className='account-select'
            onClick={selectAll}
          >
            All
          </button>
          <button
            className='account-select'
            onClick={selectPersonal}
          >
            Personal
          </button>
          <button
            className='account-select'
            onClick={selectCommunal}
          >
            Shared
          </button>
          <button
            className='account-select'
            onClick={popNewAccount}
          >
            + New
          </button>
        </div>
        {list.map((account, idx) => (
          <div key={idx} className='account-list-item'>
            {account.name}
          </div>
        ))}
      </div>
      <CurrentAccount />
    </div>
  );
}
