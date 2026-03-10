import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { HomeBrand } from "./home-brand";
import { HomeNavPill } from "./home-nav-pill";
import { HomeUserMenu } from "./home-user-menu";

export function HomeTopBarView() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={cn(
				"sticky top-0 z-100 flex items-center justify-between px-10 py-4 transition-colors duration-200",
				isScrolled && "bg-[#070C16]/70 backdrop-blur-lg shadow-lg",
			)}
		>
			<HomeBrand />

			<HomeNavPill />

			<HomeUserMenu />
		</div>
	);
}
