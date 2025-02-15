"use client";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "@/services/react-query";

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

			<Toaster richColors />
		</>
	);
}
