export interface MovieCastMember {
	character: string;
	id: number;
	name: string;
	profileUrl: string;
}

export interface MovieDetails {
	backgroundUrl: string;
	cast: MovieCastMember[];
	director: string;
	genres: string[];
	id: number;
	overview: string;
	posterUrl: string;
	rating: number;
	releaseYear: string;
	runtimeMinutes: number;
	tagline: string;
	title: string;
	writers: string;
}
