import Image from "next/image";
import appPreviewImage from "../assets/app-preview.png";
import { UserNameForm } from "@/components/forms/user-name-form";

export default function Home() {
	return (
		<div className="bg-gray-900 text-white">
			<div
				className="flex p-0 max-w-[calc(100vw-((100vw-1160px)/2))] ml-auto h-screen
			gap-20 items-center"
			>
				<div className="max-w-[500px] py-0 px-10 flex flex-col gap-4">
					<h1 className="text-6xl font-bold leading-tight">
						Agendamento descomplicado
					</h1>

					<p className="text-lg text-muted-foreground">
						Conecte seu calendário e permita que as pessoas marquem agendamentos
						no seu tempo livre.
					</p>

					<UserNameForm />
				</div>

				<div className="hidden md:block">
					<Image
						src={appPreviewImage}
						alt="Calendário simbolizando a aplicação em funcionamento"
						height={400}
						quality={100}
						priority
					/>
				</div>
			</div>
		</div>
	);
}
