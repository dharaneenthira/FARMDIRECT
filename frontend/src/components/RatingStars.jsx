import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 4.8, max = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? 'text-amber-400 fill-amber-400'
              : 'text-slate-300'
          }`}
        />
      ))}
      <span className="ml-1 text-xs font-bold text-slate-700">{rating}</span>
    </div>
  );
};
