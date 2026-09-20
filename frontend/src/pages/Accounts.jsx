import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function AccountForm({ onBookCreated }) {
    const { token } = useAuth();
    const [title, setTitle] = useState("");

    
}

export default BookForm;