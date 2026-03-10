import type { QuestionBankTemplateCard } from "../types";

type QuestionBankTemplateCardProps = {
	card: QuestionBankTemplateCard;
};

export function QuestionBankTemplateCard({ card }: QuestionBankTemplateCardProps) {
	return (
		<article className="group relative h-[180px] overflow-hidden rounded-2xl bg-[#0E1115] shadow-[0_20px_45px_-24px_rgba(0,0,0,0.85)]">
			<img
				className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
				src={card.image}
				alt={card.title}
				loading="lazy"
			/>

			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.68)_100%)]" />

			<div className="absolute inset-x-5 top-4 flex items-start justify-between gap-3">
				<h3 className="line-clamp-2 max-w-[80%] text-lg font-semibold tracking-[-0.02em] text-white">
					{card.title}
				</h3>

				{card.badge ? (
					<span className="rounded-full border border-white/35 bg-black/55 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-white">
						{card.badge}
					</span>
				) : null}
			</div>

			<p className="absolute inset-x-5 bottom-4 line-clamp-2 text-sm leading-5 text-white/86">
				{card.description}
			</p>
		</article>
	);
}
