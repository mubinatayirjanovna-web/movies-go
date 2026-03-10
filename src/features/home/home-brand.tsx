import { ArrowLeft } from "lucide-react";
import { matchPath, useLocation, useNavigate } from "react-router";

export function HomeBrand() {
	const location = useLocation();
	const navigate = useNavigate();

	const isBookDetailsPage = Boolean(matchPath("/:bookId", location.pathname));

	if (isBookDetailsPage) {
		const handleGoBack = () => {
			if (window.history.length > 1) {
				navigate(-1);
				return;
			}

			navigate("/");
		};

		return (
			<button
				type="button"
				onClick={handleGoBack}
				className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-white shadow-[0_20px_40px_-28px_rgba(0,0,0,0.7)] backdrop-blur-xl transition hover:bg-white/20"
				aria-label="Go back"
			>
				<ArrowLeft className="size-4" />
				<span className="text-sm font-semibold tracking-[0.04em]">Back</span>
			</button>
		);
	}

	return (
		<div className="flex items-center rounded-full">
			<h2 className="text-2xl font-bold text-white text-shadow-lg">Movie Go</h2>
		</div>
	);
}
