function TagItem({ title, color }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 mr-2 mb-2 rounded-full text-sm font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {title}
    </span>
  );
}

export default TagItem;