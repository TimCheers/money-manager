import { useState } from 'react'
import './App.css'
import TransactionItem from "./components/TransactionItem.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <h1>Money Manager </h1>
        <TransactionItem amount={500} category="Food" date="2026-07-29" />
        <TransactionItem amount={1000} category="Tax" date="2026-07-30" />
      </section>
    </>
  )
}

export default App
