import { useState } from 'react'
import './App.css'
import TransactionItem from "./components/TransactionItem.jsx"

function App() {
  const [count, setCount] = useState(0)
  const transactions = [
    { id: 1, amount: 500, category: "Food", date: "2026-07-29" },
    { id: 2, amount: 32423, category: "Games", date: "2026-07-13" },
    { id: 3, amount: 5045340, category: "Tax", date: "2026-07-03" },
    { id: 4, amount: 32421, category: "Food", date: "2026-07-23" },

  ];
  return (
    <>
      <section id="center">
        <h1>Money Manager </h1>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} amount={transaction.amount} category={transaction.category} date={transaction.date} />
        ))}
      </section>
    </>
  )
}

export default App
