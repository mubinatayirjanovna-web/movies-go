import { Search } from "lucide-react";
import { Link } from "react-router";

export function HomeNavPill() {
	return (
		<div className="bg-black text-white shadow-lg items-center h-12 flex p-1 rounded-[40px]">
			<nav className="flex gap-10 text-sm px-5">
				<Link to={"#"}>Movies</Link>
				<Link className="opacity-50" to={"#"}>
					Series
				</Link>
				<Link className="opacity-50" to={"#"}>
					Originals
				</Link>
			</nav>
			<button className="h-10 w-10 bg-white/20 flex justify-center items-center rounded-full">
				<Search className="size-4" />
			</button>
		</div>
	);
}
