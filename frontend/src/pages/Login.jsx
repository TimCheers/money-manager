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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit">Ввод</button>
        </form>
    );
}

export default Login