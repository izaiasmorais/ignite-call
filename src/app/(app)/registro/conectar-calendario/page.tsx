"use client";
import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { ArrowRight, LoaderCircle, LogOut } from "lucide-react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ConnectCalendar() {
	const router = useRouter();
	const { status, data } = useSession();
	const searchParams = useSearchParams();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const hasAuthError = !!searchParams.get("error");
	const hasSignedIn = status === "authenticated";

	if (!isClient) {
		return null;
	}

	async function handleSignIn() {
		await signIn("google");
	}

	async function handleSignOut() {
		await signOut();
	}

	return (
		<div className="flex flex-col gap-8">
			<Header
				title="Conecte seu calendário!"
				description="Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados."
				currentStep={2}
			/>

			<div className="bg-gray-800 p-6 flex flex-col gap-4 rounded-lg">
				<div className="flex items-center justify-between p-4 rounded-md border border-gray-600">
					<span>Google Calendário</span>

					{status === "loading" ? (
						<Button
							className="border border-gray-500 text-gray-500 bg-transparent hover:bg-transparent w-[150px]"
							disabled
						>
							<LoaderCircle className="animate-spin" />
						</Button>
					) : status === "unauthenticated" ? (
						<Button
							className="border-ignite-500 text-ignite-500 bg-transparent hover:bg-transparent border hover:border-ignite-600 hover:text-ignite-600 w-[150px]"
							onClick={handleSignIn}
						>
							Conectar
							<ArrowRight />
						</Button>
					) : (
						<Button
							className="border-red-500 text-red-500 bg-transparent hover:bg-transparent border hover:border-red-600 hover:text-red-600 w-[150px]"
							onClick={handleSignOut}
						>
							Desconectar
							<LogOut />
						</Button>
					)}
				</div>

				{hasAuthError && (
					<span className="text-red-500 text-sm">
						Falha ao se conectar ao Google, verifique se você habilitou as
						perrmissões de acesso ao Google Calendar
					</span>
				)}

				{hasSignedIn ? (
					<Button
						className="bg-ignite-500 hover:bg-ignite-600"
						onClick={() => router.push("/registro/cronograma")}
					>
						Próximo Passo <ArrowRight />
					</Button>
				) : (
					<Button className="bg-gray-500 hover:bg-gray-600" disabled>
						Próximo Passo <ArrowRight />
					</Button>
				)}
			</div>
		</div>
	);
}
