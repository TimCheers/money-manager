function TransactionItem({ amount, category, account }) {
  return (
    <div className="flex justify-between items-center p-4 mb-2 rounded-lg bg-gray-800 border border-gray-700">
      <div>
        <p className="font-medium">{category}</p>
        <p className="text-sm text-gray-400">{account}</p>
      </div>
      <span className="text-lg font-semibold">{amount} ₽</span>
    </div>
  );
}

export default TransactionItem;