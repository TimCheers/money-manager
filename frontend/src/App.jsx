import { useState, useEffect } from "react";
import './App.css'
import TransactionItem from "./components/TransactionItem.jsx"

function App() {
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/transactions")
    .then((res) => res.json())
    .then((data) => setTransactions(data))
    .catch((error) => console.error("Failed to fetch transactions:", error));
  }, []);
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

export default App
