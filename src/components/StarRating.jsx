// src/components/StarRating.jsx
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function StarRating({ movieId, size = "md" }) {
  const { getUserRating, setUserRating } = useApp();
  const [hovered, setHovered] = useState(0);
  const current = getUserRating(movieId);

  const sizeClass = size === "sm" ? "text-base" : "text-2xl";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          title={`Rate ${star} star${star > 1 ? "s" : ""}`}
          className={`${sizeClass} transition-transform duration-100 hover:scale-125 focus:outline-none`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={(e) => {
            e.stopPropagation();
            setUserRating(movieId, star === current ? 0 : star);
          }}
        >
          <span
            className={
              star <= (hovered || current)
                ? "text-yellow-400"
                : "text-gray-600"
            }
          >
            ★
          </span>
        </button>
      ))}
      {current > 0 && (
        <span className="ml-1 text-xs text-yellow-400 font-semibold">
          {current}/5
        </span>
      )}
    </div>
  );
}
