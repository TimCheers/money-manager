import { useState, useEffect } from "react";
import TagItem from "../components/TagItem.jsx"
import TagForm from "../components/TagForm.jsx"
import { useAuth } from "../context/AuthContext.jsx";

function Tags() {
    const { token } = useAuth();
    const [tags, setTags] = useState([]);
    useEffect(() => {
        if (!token) return;
        fetch("http://localhost:3000/tags", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setTags(data))
            .catch((error) => console.error("Failed to fetch tags:", error));
    }, [token]);

    function handleTagCreated(newTag) {
        setTags((prevTags) => [...prevTags, newTag]);
    }

    return (
        <>
            <div>
                <TagForm onTagCreated={handleTagCreated} />
                <section id="center">
                    <h1 className="text-2xl font-bold mb-6">Tags</h1>
                    {tags.map((tag) => (
                        <TagItem key={tag._id} title={tag.title} color={tag.color} />
                    ))}
                </section>
            </div>
        </>
    )
}

export default Tags;