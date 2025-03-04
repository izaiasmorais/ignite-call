import { UpdateProfileForm } from "@/components/forms/update-profile-form";
import { Header } from "@/components/header/header";

export default function UpdateProfile() {
	return (
		<div className="flex flex-col gap-8">
			<Header
				title="Defina sua disponibilidade"
				description="Por último, uma breve descrição e uma foto de perfil."
				currentStep={4}
			/>

			<div className="bg-gray-800 p-6 flex flex-col gap-4 rounded-lg">
				<UpdateProfileForm />
			</div>
		</div>
	);
}
