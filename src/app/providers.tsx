"use client";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/react-query";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<>
			<SessionProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</SessionProvider>

			<Toaster richColors />
		</>
	);
}
