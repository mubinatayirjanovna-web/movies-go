import type { Swiper as SwiperType } from "swiper";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";

import type { QuestionBankTemplateCard as QuestionBankTemplateCardType } from "../types";

import { QUESTION_BANK_TEMPLATE_CARDS } from "../data";
import { QuestionBankTemplateCard } from "./question-bank-template-card";

import "swiper/css";

type QuestionBankTemplatesCarouselProps = {
	cards?: QuestionBankTemplateCardType[];
	subtitle?: string;
	title?: string;
};

export function QuestionBankTemplatesCarousel({
	cards,
	subtitle = "Scenes, visuals, and moments from this movie.",
	title = "Movie Highlights",
}: QuestionBankTemplatesCarouselProps) {
	const swiperRef = useRef<SwiperType | null>(null);
	const [canGoPrev, setCanGoPrev] = useState(false);
	const [canGoNext, setCanGoNext] = useState(true);
	const cardsToRender = cards && cards.length > 0 ? cards : QUESTION_BANK_TEMPLATE_CARDS;

	const syncNavigationState = (swiper: SwiperType) => {
		setCanGoPrev(!swiper.isBeginning);
		setCanGoNext(!swiper.isEnd);
	};

	return (
		<section className="mt-14">
			<div className="mb-5 flex items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
					<p className="mt-1 text-sm text-white/65 sm:text-base">{subtitle}</p>
				</div>
			</div>

			<div className="question-bank-templates relative overflow-hidden rounded-xl">
				<Swiper
					speed={650}
					slidesPerView="auto"
					spaceBetween={16}
					watchOverflow
					keyboard={{ enabled: true }}
					modules={[Keyboard]}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
						syncNavigationState(swiper);
					}}
					onSlideChange={syncNavigationState}
					onResize={syncNavigationState}
					className="question-bank-templates__swiper overflow-visible"
				>
					{cardsToRender.map((card) => (
						<SwiperSlide key={card.id} className="!w-[250px] sm:!w-[272px] xl:!w-[286px]">
							<QuestionBankTemplateCard card={card} />
						</SwiperSlide>
					))}
				</Swiper>

				<button
					type="button"
					onClick={() => swiperRef.current?.slidePrev()}
					className={cn(
						"absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-[#BCAEA6]/60 text-white backdrop-blur-xl transition-all hover:bg-[#C8BBB3]/75",
						!canGoPrev && "pointer-events-none opacity-0",
					)}
					aria-label="Previous template"
				>
					<ChevronLeft className="size-5" />
				</button>

				<button
					type="button"
					onClick={() => swiperRef.current?.slideNext()}
					className={cn(
						"absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-[#8F776C]/70 text-white backdrop-blur-xl transition-all hover:bg-[#9D877D]/80",
						!canGoNext && "pointer-events-none opacity-0",
					)}
					aria-label="Next template"
				>
					<ChevronRight className="size-5" />
				</button>
			</div>
		</section>
	);
}
