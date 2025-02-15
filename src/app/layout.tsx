import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "./providers";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Ignite Call",
	description: "Agendamento Descomplicado",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>

			<body className={`${geistSans.className} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
