import { useQuery } from "@tanstack/react-query";

import { hasTmdbCredentials } from "@/lib/env";

import type { MovieDetails } from "../movie-details.types";

import { getMovieDetails } from "../api";

export function useMovieDetails(movieId: string | undefined) {
	return useQuery<MovieDetails, Error>({
		queryKey: ["movie-details", movieId],
		enabled: Boolean(movieId) && hasTmdbCredentials,
		queryFn: () => getMovieDetails(movieId || ""),
	});
}
