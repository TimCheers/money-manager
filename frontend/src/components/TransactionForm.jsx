import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function TransactionForm({ existingTransaction, onSaved }) {
    const { token } = useAuth();
    const [amount, setAmount] = useState(existingTransaction?.amount || "");
    const [category, setCategory] = useState(existingTransaction?.category?._id || "");
    const [account, setAccount] = useState(existingTransaction?.account?._id || "");
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        if (!token) return;
        fetch("http://localhost:3000/categories", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Failed to fetch categories:", error));

        fetch("http://localhost:3000/accounts", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setAccounts(data))
            .catch((error) => console.error("Failed to fetch accounts:", error));

        fetch("http://localhost:3000/tags", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setTags(data))
            .catch((error) => console.error("Failed to fetch tegs:", error));
    }, [token]);

    useEffect(() => {
        if (existingTransaction) {
            setAmount(existingTransaction.amount);
            setCategory(existingTransaction.category._id);
            setAccount(existingTransaction.account._id);
        }
    }, [existingTransaction]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const isEditing = Boolean(existingTransaction);
            const url = isEditing
                ? `http://localhost:3000/transactions/${existingTransaction._id}`
                : "http://localhost:3000/transactions";
            const method = isEditing ? "PUT" : "POST";
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ amount, category, account, tags: selectedTags }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Ошибка:", data.error);
                return;
            }

            onSaved(data);
            setAmount("");
            setCategory("");
            setAccount("");
            setSelectedTags([]);
        } catch (error) {
            console.error("Сетевая ошибка:", error);
        }
    }
    function toggleTag(id) {
        setSelectedTags((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Сумма"
                className="w-28 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
            >
                <option value="">Категория</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.title}</option>
                ))}
            </select>
            <select
                value={account}
                onChange={(event) => setAccount(event.target.value)}
                className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
            >
                <option value="">Счёт</option>
                {accounts.map((acc) => (
                    <option key={acc._id} value={acc._id}>{acc.title}</option>
                ))}
            </select>
            <div>
                {tags.map((tag) => (
                    <label key={tag._id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedTags.includes(tag._id)}
                            onChange={() => toggleTag(tag._id)}
                        />
                        {tag.title}
                    </label>
                ))}
            </div>

            <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition font-medium">
                Добавить
            </button>
        </form>
    );
}

export default TransactionForm;