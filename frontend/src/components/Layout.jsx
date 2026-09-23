import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Layout() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <nav className="flex items-center gap-6 px-6 py-4 bg-gray-800 border-b border-gray-700">
                {!token && (
                    <>
                        <Link to="/login" className="hover:text-blue-400 transition">Логин</Link>
                        <Link to="/register" className="hover:text-blue-400 transition">Регистрация</Link>
                    </>
                )}
                {token && (
                    <>
                        <Link to="/" className="hover:text-blue-400 transition">Главная</Link>
                        <Link to="/accounts" className="hover:text-blue-400 transition">Счета</Link>
                        <Link to="/tags" className="hover:text-blue-400 transition">Теги</Link>
                        <Link to="/categories" className="hover:text-blue-400 transition">Категории</Link>
                        <button onClick={handleLogout} className="ml-auto px-4 py-1.5 rounded bg-blue-600 hover:bg-red-700 transition text-sm">
                            Выйти
                        </button>
                    </>
                )}
            </nav>
            <main className="max-w-3xl mx-auto p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;