import { WelcomeForm } from "@/components/forms/welcome-form";
import { Header } from "@/components/header/header";

export default function Register() {
	return (
		<div className="flex flex-col gap-8">
			<Header
				title="Bem-vindo ao Ignite Call!"
				description="Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois."
				currentStep={1}
			/>

			<WelcomeForm />
		</div>
	);
}
