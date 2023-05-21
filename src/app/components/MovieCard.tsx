import React, { useState } from "react";

interface Movie {
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const MovieCard: React.FC<{ item: Movie }> = ({ item }) => {
  const imgBaseUrl = `https://image.tmdb.org/t/p/w500`;

  return (
    <div className="hover:shadow-lg transition duration-300 hover:bg-slate-100 bg-white rounded-lg shadow-md p-4 mb-4">
      <img
        src={`${imgBaseUrl}${item.poster_path}`}
        alt="Movie Poster"
        className="w-96 h-auto mb-4 hover:scale-105 transform transition-transform duration-300"
      />
      <h2 className="text-gray-500 font-semibold mb-2">
        {item.original_title.slice(0, 20)}
      </h2>
      {/* <p className="text-gray-600 mb-2">{item.overview}</p> */}
      <p className="text-gray-500 text-sm mb-2">{item.release_date}</p>
      <div className="flex items-center">
        <svg
          className="w-4 h-4 text-yellow-500 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 0L4.244 6.451l1.53 8.893L10 16.683l4.227-1.339 1.53-8.893L10 0zm.514 2.928a1 1 0 0 1 .972.743l1.23 6.746 6.683.842a1 1 0 0 1 .553 1.666l-4.833 4.732 1.14 6.82a1 1 0 0 1-1.452 1.054L10 17.735l-5.859 3.073a1 1 0 0 1-1.452-1.054l1.14-6.82-4.833-4.732a1 1 0 0 1 .553-1.666l6.683-.842 1.23-6.746a1 1 0 0 1 .972-.743z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-gray-600">Rating: {item.vote_average}/10</p>
      </div>
    </div>
  );
};

export default MovieCard;
