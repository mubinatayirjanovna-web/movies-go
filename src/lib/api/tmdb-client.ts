import axios from "axios";

import { env } from "@/lib/env";

export const tmdbClient = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: env.tmdbReadAccessToken
		? {
				Authorization: `Bearer ${env.tmdbReadAccessToken}`,
			}
		: undefined,
});
