"use client";

import { API_KEY, BaseUrl } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MovieCard from "../components/MovieCard";

interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieListResponse {
  results: Movie[]; // Array of movies
}
const Movie = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");

  const { data, isLoading, isError, error, status } = useQuery<
    MovieListResponse,
    Error
  >({
    queryKey: ["movieLists"],
    queryFn: () =>
      axios
        .get(
          `${BaseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        )
        .then((res) => res.data),
  });

  const dataSearch = data?.results?.filter((movie: Movie) => {
    let text1 = searchText.toLowerCase();
    const searched = text1
      ? movie?.original_title?.toLowerCase().includes(text1)
      : true;
    return searched;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white-900"></div>
      </div>
    );
  }

  const goToMovieDetails = (id: number) => {
    router.push(`/moviedetails/${id}`);
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <h1>{error?.message}</h1>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-center text-2xl font-bold">GameOn</h4>

      <div className="w-full py-4 px-4">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search Movie Name..."
          style={{ color: "black" }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-wrap m-2">
        {dataSearch?.map((movie: Movie) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => goToMovieDetails(movie.id)}
            className="w-full sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 px-4"
          >
            <div className="hover:bg-slate-100 bg-white rounded-lg shadow-md p-4 mb-4">
              <MovieCard item={movie} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
