import { useState, useEffect } from "react";
import TransactionItem from "../components/TransactionItem.jsx"
import TransactionForm from "../components/TransactionForm.jsx"
import { useAuth } from "../context/AuthContext.jsx";

function Dashboard() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3000/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Failed to fetch transactions:", error));
  }, [token]);

  function handleTransactionCreated(newTransaction) {
    setTransactions((prev) => [...prev, newTransaction]);
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Money Manager</h1>
      <TransactionForm onTransactionCreated={handleTransactionCreated} />
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction._id}
          amount={transaction.amount}
          category={transaction.category.title}
          account={transaction.account.title}
        />
      ))}
    </>
  )
}

export default Dashboard