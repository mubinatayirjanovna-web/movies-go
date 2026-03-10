import { useQuery } from "@tanstack/react-query";

import { hasTmdbCredentials } from "@/lib/env";

import type { TrendingMovie } from "../types";

import { getTrendingMoviesWeek } from "../api";

export function useTrendingMoviesWeek() {
	return useQuery<TrendingMovie[], Error>({
		queryKey: ["trending-movies-week"],
		enabled: hasTmdbCredentials,
		queryFn: getTrendingMoviesWeek,
	});
}
