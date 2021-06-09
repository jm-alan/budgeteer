import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CurrentAccount from './CurrentAccount';
import { GetAllAccounts } from '../../store/accounts';

export default function Accounts () {
  const dispatch = useDispatch();

  const list = useSelector(state => state.accounts.list);

  useEffect(() => {
    dispatch(GetAllAccounts());
  }, [dispatch]);

  return (
    <div className='container accounts-page'>
      <div className='subcontainer accounts-list sidebar'>
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
