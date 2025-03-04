import { Header } from "@/components/header/header";
import CheckboxTimeRange from "@/components/schedule/checkbox-time-range";

export default function Availability() {
	return (
		<div className="flex flex-col gap-8">
			<Header
				title="Quase lá"
				description="Defina o intervalo de horários que você está disponível em cada dia da semana."
				currentStep={3}
			/>

			<div className="bg-gray-800 p-6 flex flex-col gap-4 rounded-lg">
				<CheckboxTimeRange />
			</div>
		</div>
	);
}
