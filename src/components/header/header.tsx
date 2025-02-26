import { MultiStep } from "../multi-step/multi-step";

interface HeaderProps {
	currentStep: number;
	title: string;
	description: string;
}

export function Header({ currentStep, title, description }: HeaderProps) {
	return (
		<header className="flex flex-col gap-6">
			<div className="flex flex-col">
				<strong className="text-2xl">{title}</strong>
				<span className="text-gray-200">{description}</span>
			</div>

			<MultiStep currentStep={currentStep} />
		</header>
	);
}
