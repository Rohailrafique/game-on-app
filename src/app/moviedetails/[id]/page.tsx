"use client";
import { API_KEY, BaseUrl } from "@/utils/config";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Movie {
  original_title: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  overview: string;
  vote_average: number;
  homepage: string;
}

interface MovieDetailsProps {
  params: {
    id: number;
  };
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ params }) => {
  const imgBaseUrl = `https://image.tmdb.org/t/p/w500`;

  const { data, isLoading, isError, error } = useQuery<Movie, Error>({
    queryKey: ["movieLists"],
    queryFn: () =>
      axios
        .get<Movie>(`${BaseUrl}/movie/${params.id}?language=en-US`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        })
        .then((res) => res.data),
  });

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <h1>{error?.message}</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img
              src={`${imgBaseUrl}${data.poster_path}`}
              alt="Movie Poster"
              className="w-100 h-auto"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-4">
              {data.original_title}
            </h1>
            {/* <p className="text-gray-600 mb-4">Director: </p> */}
            <p className="text-gray-600 mb-4">Popularity: {data.popularity}</p>
            <p className="text-gray-600 mb-4">
              Release Date: {data.release_date}
            </p>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 mb-4">{data.overview}</p>
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-500 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0L4.244 6.451l1.53 8.893L10 16.683l4.227-1.339 1.53-8.893L10 0zm.514 2.928a1 1 0 0 1 .972.743l1.23 6.746 6.683.842a1 1 0 0 1 .553 1.666l-4.833 4.732 1.14 6.82a1 1 0 0 1-1.452 1.054L10 17.735l-5.859 3.073a1 1 0 0 1-1.452-1.054l1.14-6.82-4.833-4.732a1 1 0 0 1 .553-1.666l6.683-.842 1.23-6.746a1 1 0 0 1 .972-.743z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-600">Rating: {data.vote_average}/10</p>
            </div>
            <a
              target="_blank"
              href={data.homepage}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Watch Trailer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
