import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CurrentAccount from './CurrentAccount';
import NewAccountForm from './NewAccount';
import AccountListEntry from './AccountListEntry';
import {
  GetAllCommunals,
  GetAllPersonals,
  SelectAll,
  SelectCommunals,
  SelectPersonals,
  UnloadAccounts
} from '../../store/accounts/actions';
import { SetCurrentModal } from '../../store/modal';
import { ShowModal } from '../../store/UX';

import './index.css';

export default function Accounts () {
  const dispatch = useDispatch();

  const list = useSelector(state => state.accounts.list);

  const selectAll = () => dispatch(SelectAll());
  const selectPersonals = () => dispatch(SelectPersonals());
  const selectCommunals = () => dispatch(SelectCommunals());

  const popNewAccount = () => {
    dispatch(SetCurrentModal(NewAccountForm));
    dispatch(ShowModal());
  };

  useEffect(() => {
    dispatch(GetAllPersonals());
    dispatch(GetAllCommunals());
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
            onClick={selectPersonals}
          >
            Personal
          </button>
          <button
            className='account-select'
            onClick={selectCommunals}
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
          <AccountListEntry key={idx} account={account} />
        ))}
      </div>
      <CurrentAccount />
    </div>
  );
}
