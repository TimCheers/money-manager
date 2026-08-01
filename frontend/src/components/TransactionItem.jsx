function TransactionItem({ amount, category, account }) {
  return (
    <div>
      <p>{amount}</p>
      <p>{category}</p>
      <p>{account}</p>
    </div>
  );
}

export default TransactionItem;