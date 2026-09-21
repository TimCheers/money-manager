import { useState, useEffect } from "react";
import TransactionItem from "../components/TransactionItem.jsx"
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
  return (
    <>
      <section id="center">
        <h1>Money Manager </h1>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction._id} amount={transaction.amount} category={transaction.category.title} account={transaction.account.title} />
        ))}
      </section>
    </>
  )
}

export default Dashboard
