// src/components/Navbar.jsx
export default function Navbar({ query, setQuery, onSearch }) {
  return (
    <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-gray-800 shadow">
      <h1 className="text-xl font-bold text-blue-400">🎬 MovieApp</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className="px-3 py-1 rounded bg-gray-700 text-white outline-none"
        />
        <button
          onClick={onSearch}
          className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
}