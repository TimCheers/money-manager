import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function CategoryForm({ onCategoryCreated }) {
    const { token } = useAuth();
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Income");
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, type }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Ошибка:", data.error);
                return;
            }

            onCategoryCreated(data);
            setTitle("");
            setType("");
        } catch (error) {
            console.error("Сетевая ошибка:", error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Название категории"
                    className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <select
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                >
                    <option value="Income">Доход</option>
                    <option value="Expense">Расход</option>
                </select>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition font-medium">
                    Добавить
                </button>
            </form>
        </>
    )
}

export default CategoryForm;