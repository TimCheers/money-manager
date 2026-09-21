import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function AccountForm({ onAccountCreated }) {
    const { token } = useAuth();
    const [title, setTitle] = useState("");
    const [balance, setBalance] = useState("");
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/accounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, balance }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Ошибка:", data.error);
                return;
            }

            onAccountCreated(data);
            setTitle("");
            setBalance("");
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
                    placeholder="Название счета"
                />
                <input
                    type="number"
                    value={balance}
                    onChange={(event) => setBalance(event.target.value)}
                    placeholder="Баланс"
                />
                <button type="submit">Добавить</button>
            </form>
        </>
    )
}

export default AccountForm;