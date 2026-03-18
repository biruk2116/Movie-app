// src/components/MovieModal.jsx
import React from "react";

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-2">{movie.title || "No Title"}</h2>
        <p className="mb-2">Release Date: {movie.release_date || "N/A"}</p>
        <p>{movie.overview || "No description available."}</p>
      </div>
    </div>
  );
};

export default MovieModal;