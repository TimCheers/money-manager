import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import CategoryItem from "../components/CategoryItem.jsx"
import CategoryForm from "../components/CategoryForm.jsx"

function Categories() {
    const { token } = useAuth();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (!token) return;
        fetch("http://localhost:3000/categories", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Failed to fetch categories:", error));
    }, [token]);

    function handleCategoryCreated(newCategory) {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    }

    return (
        <>
            <div>
                <CategoryForm onCategoryCreated={handleCategoryCreated} />
                <section id="center">
                    <h1 className="text-2xl font-bold mb-6">Categories</h1>
                    {categories.map((category) => (
                        <CategoryItem key={category._id} title={category.title} type={category.type} />
                    ))}
                </section>
            </div>
        </>
    )
}

export default Categories;