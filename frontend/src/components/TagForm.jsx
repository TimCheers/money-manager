import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function TagForm({ onTagCreated }) {
    const { token } = useAuth();
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/tags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, color }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Ошибка:", data.error);
                return;
            }

            onTagCreated(data);
            setTitle("");
            setColor("");
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
                    placeholder="Название тега"
                    className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="number"
                    value={color}
                    onChange={(event) => setBalance(event.target.value)}
                    placeholder="Цвет"
                    className="w-32 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition font-medium">
                    Добавить
                </button>
            </form>
        </>
    )
}

export default TagForm;