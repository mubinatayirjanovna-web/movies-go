import { Spinner } from "@/components/ui/spinner";

export default function SplashScreen() {
	return (
		<div className="min-h-screen flex justify-center items-center backdrop-blur-xl">
			<Spinner className="size-10 text-black/50" />
		</div>
	);
}
