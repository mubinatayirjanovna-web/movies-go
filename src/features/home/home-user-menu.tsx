import { BellRingIcon } from "lucide-react";

export function HomeUserMenu() {
	return (
		<div className="flex items-center gap-2">
			<button className="bg-white/20 shadow-[4px_4px_3px_rgba(0,0,0,0.1),inset_2px_4px_4px_rgba(0,0,0,0.10)] h-12 rounded-full flex justify-center items-center w-12">
				<BellRingIcon className="size-5 text-white" />
			</button>

			<div className="flex items-center gap-2">
				<span className="h-12 w-12  shadow-[4px_4px_3px_rgba(0,0,0,0.1),inset_2px_4px_4px_rgba(0,0,0,0.10)] overflow-hidden rounded-full bg-black inline-block">
					<img src="/avatar-9.webp" alt="avatar" />
				</span>

				<div className="flex-col flex justify-center">
					<span className="text-white text-shadow-lg font-bold">Sarah J</span>
					<span className="text-white text-shadow-lg text-xs">Premium</span>
				</div>
			</div>
		</div>
	);
}
