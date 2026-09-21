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
        <div>
            <nav>
                {!token && (
                    <>
                        <Link to="/login">Логин</Link>
                        <Link to="/register">Регистрация</Link>
                    </>
                )}
                {token && (
                    <>
                        <Link to="/">Главная</Link>
                        <Link to="/accounts">Счета</Link>
                        <Link to="/tags">Теги</Link>
                        <button onClick={handleLogout}>Выйти</button>
                    </>
                )}
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;