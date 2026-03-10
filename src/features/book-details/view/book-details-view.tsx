import { Bookmark, Clock3, Share2, Star } from "lucide-react";
import { createPortal } from "react-dom";
import { useParams } from "react-router";

import { Skeleton } from "@/components/ui/skeleton";
import { hasTmdbCredentials } from "@/lib/env";

import type { MovieDetails } from "../movie-details.types";
import type { QuestionBankTemplateCard } from "../types";

import { useMovieDetails } from "../hooks";
import { QuestionBankTemplatesCarousel } from "./question-bank-templates-carousel";

const FALLBACK_BACKGROUND_URL = "/background-6.webp";

function formatRuntime(runtimeMinutes: number) {
	if (!runtimeMinutes) return "N/A";

	const hours = Math.floor(runtimeMinutes / 60);
	const minutes = runtimeMinutes % 60;

	if (hours === 0) {
		return `${minutes}m`;
	}

	return `${hours}h ${minutes}m`;
}

function truncateText(value: string, maxLength: number) {
	if (!value) return "";
	if (value.length <= maxLength) return value;
	return `${value.slice(0, maxLength).trimEnd()}...`;
}

function buildMovieCarouselCards(movie: MovieDetails): QuestionBankTemplateCard[] {
	const castNames = movie.cast.slice(0, 3).map((member) => member.name);
	const castDescription =
		castNames.length > 0
			? `${castNames.join(", ")}${movie.cast.length > 3 ? " and more cast members." : "."}`
			: "Main cast moments and character highlights.";

	return [
		{
			id: `${movie.id}-story-overview`,
			title: "Story Overview",
			image: movie.backgroundUrl,
			description: truncateText(movie.overview, 86) || "Main story setup and tone.",
			badge: "PLOT",
		},
		{
			id: `${movie.id}-cast-spotlight`,
			title: "Cast Spotlight",
			image: movie.cast[0]?.profileUrl || movie.posterUrl,
			description: castDescription,
			badge: "CAST",
		},
		{
			id: `${movie.id}-visual-style`,
			title: "Visual Style",
			image: movie.backgroundUrl,
			description: `Color, lighting, and camera mood from ${movie.title}.`,
			badge: "STYLE",
		},
		{
			id: `${movie.id}-director-cut`,
			title: "Director's Cut",
			image: movie.posterUrl,
			description: `Directed by ${movie.director}. Tone and pacing highlights.`,
			badge: "CREW",
		},
		{
			id: `${movie.id}-key-moments`,
			title: "Key Moments",
			image: movie.backgroundUrl,
			description: `Top scenes and turning points from ${movie.title}.`,
		},
	];
}

type BookDetailsBackgroundProps = {
	imageUrl: string;
	title: string;
};

function BookDetailsBackground({ imageUrl, title }: BookDetailsBackgroundProps) {
	if (typeof document === "undefined") {
		return null;
	}

	return createPortal(
		<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			<img
				src={imageUrl}
				alt={`${title} background`}
				className="fixed inset-0 h-full w-full object-cover object-center scale-105 blur-[2px]"
			/>
			<div className="absolute inset-0 backdrop-blur-[2px] bg-[radial-gradient(circle_at_top,rgba(10,17,30,0.3)_0%,rgba(8,12,20,0.78)_52%,rgba(5,7,12,0.94)_100%)]" />
			<div className="absolute inset-0 backdrop-blur-[2px] bg-[linear-gradient(180deg,rgba(4,6,11,0.22)_0%,rgba(4,6,11,0.64)_48%,rgba(2,4,8,0.92)_100%)]" />
		</div>,
		document.body,
	);
}

function BookDetailsSkeleton() {
	return (
		<section className="overflow-hidden rounded-[30px] p-5 sm:p-8">
			<div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
				<Skeleton className="h-[420px] rounded-2xl bg-white/10 sm:h-[450px]" />

				<div className="space-y-4">
					<Skeleton className="h-5 w-60 bg-white/12" />
					<Skeleton className="h-10 w-72 bg-white/12" />
					<Skeleton className="h-4 w-44 bg-white/12" />
					<Skeleton className="h-4 w-64 bg-white/12" />
					<Skeleton className="h-28 w-full bg-white/10" />
					<Skeleton className="h-14 w-full bg-white/10" />
				</div>
			</div>

			<div className="mt-8 flex flex-wrap gap-3">
				{Array.from({ length: 5 }).map((_, index) => (
					<Skeleton key={index} className="size-14 rounded-full bg-white/15" />
				))}
			</div>
		</section>
	);
}

export function BookDetailsView() {
	const { bookId } = useParams();
	const { data: movie, error, isLoading } = useMovieDetails(bookId);

	const backgroundUrl = movie?.backgroundUrl || FALLBACK_BACKGROUND_URL;
	const carouselCards = movie ? buildMovieCarouselCards(movie) : undefined;
	const carouselSubtitle = movie
		? `Scenes and visuals selected from ${movie.title}.`
		: "Scenes, visuals, and moments from this movie.";
	const carouselTitle = movie ? `${movie.title} Highlights` : "Movie Highlights";
	const titleForBackground = movie?.title || "Movie";

	return (
		<>
			<BookDetailsBackground imageUrl={backgroundUrl} title={titleForBackground} />

			<div className="relative z-10 mx-auto max-w-[1280px] px-4 pb-14 pt-10 sm:px-8 lg:px-10">
				{!hasTmdbCredentials ? (
					<section className="rounded-3xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">
						<code>VITE_TMDB_API_KEY</code> yoki <code>VITE_TMDB_READ_ACCESS_TOKEN</code>{" "}
						topilmadi. <code>.env</code> faylga TMDb credentials qo‘shing.
					</section>
				) : null}

				{hasTmdbCredentials && isLoading ? <BookDetailsSkeleton /> : null}

				{hasTmdbCredentials && error ? (
					<section className="rounded-3xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">
						Error: {error.message}
					</section>
				) : null}

				{hasTmdbCredentials && movie ? (
					<section className="overflow-hidden rounded-[30px] p-5 sm:p-8">
						<div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
							<div className="h-[420px] overflow-hidden rounded-2xl shadow-[0_30px_55px_-30px_rgba(0,0,0,0.95)] sm:h-[450px]">
								<img
									className="h-full w-full object-cover"
									src={movie.posterUrl}
									alt={`${movie.title} poster`}
								/>
							</div>

							<div>
								<div className="inline-flex items-center gap-2 text-sm text-white/90 sm:text-base">
									<span className="border-r border-white/35 pr-3">Movie</span>
									<span className="text-rose-300">
										{movie.genres.length > 0 ? movie.genres.join(" • ") : "Unknown genre"}
									</span>
								</div>

								<h1 className="my-4 text-3xl font-bold text-white sm:text-4xl">
									{movie.title} {movie.releaseYear !== "N/A" ? `(${movie.releaseYear})` : ""}
								</h1>

								{movie.tagline ? (
									<p className="mb-4 text-sm italic text-white/70 sm:text-base">"{movie.tagline}"</p>
								) : null}

								<div className="my-5 space-y-2.5 text-white/92">
									<h4>
										<span className="text-white/60">Director:</span> {movie.director}
									</h4>
									<h4>
										<span className="text-white/60">Writer:</span> {movie.writers}
									</h4>
								</div>

								<p className="max-w-4xl leading-8 text-white/82">{movie.overview}</p>

								<div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
									<div className="inline-flex flex-wrap items-center gap-3">
										<span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white">
											<Star className="size-3.5 fill-[#FF9F1A] text-[#FF9F1A]" />
											{movie.rating.toFixed(1)}
										</span>

										<span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white">
											<Clock3 className="size-3.5 text-white/90" />
											{formatRuntime(movie.runtimeMinutes)}
										</span>
									</div>

									<div className="inline-flex gap-2">
										<button
											type="button"
											className="flex size-11 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white shadow-lg backdrop-blur-3xl transition hover:bg-white/20"
											aria-label="Bookmark"
										>
											<Bookmark className="size-5" />
										</button>
										<button
											type="button"
											className="flex size-11 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white shadow-lg backdrop-blur-3xl transition hover:bg-white/20"
											aria-label="Share"
										>
											<Share2 className="size-5" />
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex flex-wrap items-center gap-2">
								{movie.cast.length > 0 ? (
									movie.cast.map((member) => (
										<div key={member.id} className="first:ml-0" title={member.name}>
											<img
												className="size-13 rounded-full object-cover"
												src={member.profileUrl}
												alt={member.name}
												loading="lazy"
											/>
										</div>
									))
								) : (
									<div className="px-3 text-sm text-slate-600">Cast information not available</div>
								)}
							</div>

							<button
								type="button"
								className="rounded-full bg-rose-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-lg shadow-rose-500/40 transition hover:bg-rose-600 sm:text-base"
							>
								Watch Now
							</button>
						</div>
					</section>
				) : null}

				<div className="relative z-10">
					<QuestionBankTemplatesCarousel
						cards={carouselCards}
						subtitle={carouselSubtitle}
						title={carouselTitle}
					/>
				</div>
			</div>
		</>
	);
}
