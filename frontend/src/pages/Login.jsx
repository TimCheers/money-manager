import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json();

            if (!response.ok) {
                console.error("Ошибка:", data.error);
                return;
            }

            login(data.token);
            navigate("/");
        } catch (error) {
            console.error("Сетевая ошибка:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-12 p-6 rounded-lg bg-gray-800 border border-gray-700 flex flex-col gap-3">
    <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        className="px-3 py-2 rounded bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
    />
    <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Пароль"
        className="px-3 py-2 rounded bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
    />
    <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition font-medium">
        Ввод
    </button>
</form>
    );
}

export default Login