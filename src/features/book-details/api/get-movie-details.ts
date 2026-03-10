import { AxiosError } from "axios";

import { tmdbClient } from "@/lib/api/tmdb-client";
import { env } from "@/lib/env";

import type { MovieCastMember, MovieDetails } from "../movie-details.types";

interface TmdbCastMember {
	character: string;
	id: number;
	name: string;
	profile_path: string | null;
}

interface TmdbCrewMember {
	id: number;
	job: string;
	name: string;
}

interface TmdbMovieDetailsResponse {
	backdrop_path: string | null;
	credits?: {
		cast: TmdbCastMember[];
		crew: TmdbCrewMember[];
	};
	genres: Array<{ id: number; name: string }>;
	id: number;
	overview: string;
	poster_path: string | null;
	release_date: string;
	runtime: number | null;
	tagline: string;
	title: string;
	vote_average: number;
}

const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";
const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_CAST_BASE_URL = "https://image.tmdb.org/t/p/w185";
const FALLBACK_BACKGROUND_URL = "/background-6.webp";
const FALLBACK_POSTER_URL = "https://via.placeholder.com/500x750?text=No+Image";
const FALLBACK_CAST_AVATAR = "/avatar-9.webp";
const WRITER_JOBS = new Set(["Screenplay", "Story", "Writer"]);

function getYearFromDate(date: string) {
	if (!date) return "N/A";
	return date.slice(0, 4);
}

function mapCastMembers(cast: TmdbCastMember[]): MovieCastMember[] {
	return cast.slice(0, 5).map((member) => ({
		character: member.character || "Unknown role",
		id: member.id,
		name: member.name,
		profileUrl: member.profile_path
			? `${TMDB_CAST_BASE_URL}${member.profile_path}`
			: FALLBACK_CAST_AVATAR,
	}));
}

function getDirectorName(crew: TmdbCrewMember[]) {
	return crew.find((member) => member.job === "Director")?.name || "Unknown";
}

function getWriterNames(crew: TmdbCrewMember[]) {
	const writers = crew
		.filter((member) => WRITER_JOBS.has(member.job))
		.map((member) => member.name)
		.filter((name, index, array) => array.indexOf(name) === index)
		.slice(0, 3);

	if (writers.length === 0) {
		return "Unknown";
	}

	return writers.join(", ");
}

function getAxiosErrorMessage(error: AxiosError) {
	const responseData = error.response?.data;

	if (typeof responseData === "object" && responseData !== null) {
		const statusMessage = (responseData as { status_message?: unknown }).status_message;
		if (typeof statusMessage === "string") {
			return statusMessage;
		}
	}

	return "Failed to fetch movie details";
}

function mapMovieDetails(data: TmdbMovieDetailsResponse): MovieDetails {
	const posterUrl = data.poster_path ? `${TMDB_POSTER_BASE_URL}${data.poster_path}` : FALLBACK_POSTER_URL;
	const backgroundUrl = data.backdrop_path
		? `${TMDB_BACKDROP_BASE_URL}${data.backdrop_path}`
		: posterUrl || FALLBACK_BACKGROUND_URL;
	const credits = data.credits ?? { cast: [], crew: [] };

	return {
		backgroundUrl,
		cast: mapCastMembers(credits.cast),
		director: getDirectorName(credits.crew),
		genres: data.genres.map((genre) => genre.name),
		id: data.id,
		overview: data.overview || "No description available for this movie.",
		posterUrl,
		rating: Number(data.vote_average ?? 0),
		releaseYear: getYearFromDate(data.release_date),
		runtimeMinutes: Number(data.runtime ?? 0),
		tagline: data.tagline || "",
		title: data.title,
		writers: getWriterNames(credits.crew),
	};
}

export async function getMovieDetails(movieId: string): Promise<MovieDetails> {
	if (!movieId) {
		throw new Error("Movie id is required");
	}

	if (!env.tmdbApiKey && !env.tmdbReadAccessToken) {
		throw new Error("TMDB credentials are missing");
	}

	const params = {
		api_key: env.tmdbReadAccessToken ? undefined : env.tmdbApiKey,
		append_to_response: "credits",
		language: "en-US",
	};

	try {
		const { data } = await tmdbClient.get<TmdbMovieDetailsResponse>(`/movie/${movieId}`, {
			params,
		});

		return mapMovieDetails(data);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(getAxiosErrorMessage(error));
		}

		throw new Error("Failed to fetch movie details");
	}
}
