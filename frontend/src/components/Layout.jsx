import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/login">Логин</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/accounts">Счета</Link>
        <Link to="/tags">Теги</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;