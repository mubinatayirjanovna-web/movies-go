export const env = {
	tmdbApiKey: import.meta.env.VITE_TMDB_API_KEY as string | undefined,
	tmdbReadAccessToken: import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN as string | undefined,
};

export const hasTmdbCredentials = Boolean(env.tmdbApiKey || env.tmdbReadAccessToken);
