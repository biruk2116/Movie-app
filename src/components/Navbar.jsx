// src/components/Navbar.jsx
import { useApp } from "../context/AppContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { favorites } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/50 group-hover:scale-110 transition-transform duration-200">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Cine<span className="text-red-500">Verse</span>
          </span>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <SearchBar />
        </div>

        {/* Favorites Badge */}
        <div className="flex-shrink-0">
          <button className="relative group flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all duration-200">
            <svg
              className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-white text-sm font-medium hidden sm:block">Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center px-1 font-bold shadow-lg">
                {favorites.length > 99 ? "99+" : favorites.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}