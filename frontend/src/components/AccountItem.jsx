function AccountItem({ title, balance }) {
  return (
    <div className="flex justify-between items-center p-4 mb-2 rounded-lg bg-gray-800 border border-gray-700">
      <span className="font-medium">{title}</span>
      <span className="text-green-400 font-semibold">{balance} ₽</span>
    </div>
  );
}

export default AccountItem;