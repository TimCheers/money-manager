function TransactionItem({ amount, category, date }) {
  return (
    <div>
      <p>{amount}</p>
      <p>{category}</p>
      <p>{date}</p>
    </div>
  );
}

export default TransactionItem;