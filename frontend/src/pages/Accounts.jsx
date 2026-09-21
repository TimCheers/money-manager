import { useState, useEffect } from "react";
import AccountItem from "../components/AccountItem.jsx"
import AccountForm from "../components/AccountForm.jsx"
import { useAuth } from "../context/AuthContext.jsx";

function Accounts() {
    const { token } = useAuth();
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        if (!token) return;
        fetch("http://localhost:3000/accounts", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setAccounts(data))
            .catch((error) => console.error("Failed to fetch accounts:", error));
    }, [token]);

    function handleAccountCreated(newAccount) {
        setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    }

    return (
        <>
            <div>
                <AccountForm onAccountCreated={handleAccountCreated} />
                <section id="center">
                    <h1 className="text-2xl font-bold mb-6">Accounts</h1>
                    {accounts.map((account) => (
                        <AccountItem key={account._id} title={account.title} balance={account.balance} />
                    ))}
                </section>
            </div>
        </>
    )
}

export default Accounts;