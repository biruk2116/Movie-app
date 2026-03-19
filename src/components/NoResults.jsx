// src/components/NoResults.jsx
export default function NoResults({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <div className="text-7xl mb-6">🎬</div>
      <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
      {query && (
        <p className="text-gray-400 text-base">
          We couldn&apos;t find any movies matching{" "}
          <span className="text-red-400 font-semibold">&quot;{query}&quot;</span>.
        </p>
      )}
      <p className="text-gray-500 text-sm mt-2">
        Try searching for something else.
      </p>
    </div>
  );
}
