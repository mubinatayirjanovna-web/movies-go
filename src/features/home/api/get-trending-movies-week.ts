import { AxiosError } from "axios";

import { tmdbClient } from "@/lib/api/tmdb-client";
import { env } from "@/lib/env";

import type { TrendingMovie } from "../types/trending-movie";

interface TmdbMovie {
	id: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	vote_average: number;
}

interface TmdbTrendingResponse {
	results: TmdbMovie[];
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER_URL = "https://via.placeholder.com/500x750?text=No+Image";

function getYearFromDate(date: string) {
	if (!date) return "N/A";
	return date.slice(0, 4);
}

function mapTmdbMovie(movie: TmdbMovie): TrendingMovie {
	return {
		id: movie.id,
		imgUrl: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : FALLBACK_POSTER_URL,
		rating: Number(movie.vote_average ?? 0),
		title: movie.title,
		year: getYearFromDate(movie.release_date),
	};
}

function getAxiosErrorMessage(error: AxiosError) {
	const responseData = error.response?.data;

	if (typeof responseData === "object" && responseData !== null) {
		const statusMessage = (responseData as { status_message?: unknown }).status_message;
		if (typeof statusMessage === "string") {
			return statusMessage;
		}
	}

	return "Failed to fetch trending movies";
}

export async function getTrendingMoviesWeek(): Promise<TrendingMovie[]> {
	if (!env.tmdbApiKey && !env.tmdbReadAccessToken) {
		throw new Error("TMDB credentials are missing");
	}

	const params = {
		api_key: env.tmdbReadAccessToken ? undefined : env.tmdbApiKey,
		language: "en-US",
	};

	try {
		const { data } = await tmdbClient.get<TmdbTrendingResponse>("/trending/movie/week", {
			params,
		});

		return data.results.map(mapTmdbMovie);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(getAxiosErrorMessage(error));
		}

		throw new Error("Failed to fetch trending movies");
	}
}
