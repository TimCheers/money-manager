import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  function login(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}