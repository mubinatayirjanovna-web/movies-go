import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

import { routes } from "@/routes";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={routes} />
		</QueryClientProvider>
	);
}
