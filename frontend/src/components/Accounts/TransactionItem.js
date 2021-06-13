
export default function TransactionItem ({ item }) {
  return (
    <div
      className={`transaction-item${
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
