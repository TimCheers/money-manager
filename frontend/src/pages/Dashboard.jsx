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

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Ошибка:", data.error);
        return;
      }

      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Сетевая ошибка:", error);
    }

  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Money Manager</h1>
      <TransactionForm onTransactionCreated={handleTransactionCreated} />
      {transactions.map((transaction) => (
        <TransactionItem
          id={transaction._id}
          onDelete={handleDelete}
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