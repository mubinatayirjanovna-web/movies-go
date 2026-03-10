import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

export function HomeCards() {
	return (
		<section className="mt-6 grid grid-cols-10 gap-4 px-10">
			{featuredCards.map((card, index) => (
				<article
					key={card.id}
					className={cn(
						index === 0 ? "col-span-4" : "col-span-6",
						"group relative overflow-hidden rounded-3xl shadow-[0_26px_52px_-20px_rgba(7,17,37,0.65)]",
					)}
				>
					<img
						src={card.background}
						alt={card.title}
						className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
					/>

					<div className={cn("absolute inset-0 rounded-3xl", card.overlayClass)} />

					<div className="relative flex h-full flex-col justify-between p-7">
						<div className="flex justify-between gap-4">
							<h3 className="max-w-[13ch] text-5xl font-semibold leading-12 text-white">
								{card.title}
							</h3>
						</div>

						<button
							type="button"
							className="mt-8 inline-flex w-fit items-center gap-3 text-[34px] font-medium text-white/90 transition hover:text-white"
						>
							<span className="inline-flex size-8 items-center justify-center rounded-full bg-[#07162E]/95">
								<Play className="ml-0.5 size-3 fill-white text-white" />
							</span>

							<span className="text-base font-normal">{card.playLabel}</span>
						</button>
					</div>
				</article>
			))}
		</section>
	);
}

const featuredCards = [
	{
		id: "blue-sword",
		title: "The Adventure of Blue Sword",
		background: "/background-3.webp",
		overlayClass: "bg-gradient-to-r from-[#0A3769] via-[#0A3769]/50 to-transparent",
		playLabel: "Let Play Moview",
	},
	{
		id: "si-dol",
		title: "Recalling the journey of Dol's exciting story",
		background: "/background-5.webp",
		overlayClass: "bg-gradient-to-r from-[#075757] via-[#0d8065]/50 to-transparent",
		brandLabel: "DisneyPAPIELAR",
		playLabel: "Let Play Moview",
	},
];
