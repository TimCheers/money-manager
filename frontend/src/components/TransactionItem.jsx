function TransactionItem({ amount, category, account, onDelete, onEdit, id }) {
  return (
    <div className="flex justify-between items-center p-4 mb-2 rounded-lg bg-gray-800 border border-gray-700">
      <div>
        <p className="font-medium">{category}</p>
        <p className="text-sm text-gray-400">{account}</p>
      </div>
      <div>
        <span className="text-lg font-semibold">{amount} ₽</span>
        <button onClick={() => onEdit(id)} className="ml-auto px-4 py-1.5 rounded bg-green-600 hover:bg-green-700 transition text-sm">
          Редактировать
        </button>
        <button onClick={() => onDelete(id)} className="ml-auto px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 transition text-sm">
          Удалить
        </button>
      </div>
    </div>

  );
}

export default TransactionItem;