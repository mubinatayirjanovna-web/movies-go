import { Outlet } from "react-router";

import ScrollToTop from "@/components/scroll-to-top";
import { HomeTopBarView } from "@/features/home/home-top-bar";

export function Layout() {
	return (
		<div className="relative z-10 min-h-screen backdrop-blur-3xl pb-8">
			<ScrollToTop />

			<HomeTopBarView />

			<Outlet />
		</div>
	);
}
