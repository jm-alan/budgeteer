import { useSelector } from 'react-redux';

export default function CurrentAccount () {
  const current = useSelector(state => state.accounts.current);

  return current && (
    <div className='subcontainer current-account'>
      <div className='subcontainer current-account-name'>
        {current.name}
      </div>
      {(current.balance && (
        <div className='subcontainer current-account-balance'>
          {current.balance}
        </div>
      )) ?? null}
      <div className='subcontainer current-account-transaction-items'>
        {current.Items.map((item, idx) => (
          <div
            key={idx}
            className={`transaction-item${item.income ? ' income' : ' expense'}`}
          >
            <div className='transaction-item-name'>
              {item.name}
            </div>
            <div className='transaction-item-amount'>
              {item.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
