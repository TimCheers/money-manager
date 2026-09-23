function CategoryItem({ title, type }) {
    return (
        <div className="flex justify-between items-center p-4 mb-2 rounded-lg bg-gray-800 border border-gray-700">
            <div>
                <p className="font-medium">{title}</p>
            </div>
            <div>
                <span className="text-lg">{type}</span>
            </div>
        </div>
    );
}

export default CategoryItem;