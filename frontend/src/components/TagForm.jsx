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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Название тега"
                />
                <input //пока ввиде текста, потом переделаю под цветовой код
                    type="text"
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                    placeholder="Цвет" 
                />
                <button type="submit">Добавить</button>
            </form>
        </>
    )
}

export default TagForm;