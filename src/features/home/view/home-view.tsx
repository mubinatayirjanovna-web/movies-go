import { HomeCards } from "../home-cards";
import { HomeCategories } from "../home-categories";
import { HomeTrendingGrid } from "../home-trending-grid";

export function HomeView() {
	return (
		<>
			<HomeCards />

			<HomeCategories />

			<HomeTrendingGrid />
		</>
	);
}
