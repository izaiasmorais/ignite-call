interface MultiStepProps {
	currentStep: number;
}

export function MultiStep({ currentStep }: MultiStepProps) {
	return (
		<div className="w-full">
			<p className="text-gray-300 text-sm mb-2">
				Passo {currentStep} de {4}
			</p>
			<div className="flex gap-2">
				{Array.from({ length: 4 }).map((_, index) => (
					<div
						key={index}
						className={`h-1 flex-1 rounded-md transition-all duration-300 ${
							index < currentStep ? "bg-gray-100" : "bg-gray-600"
						}`}
					></div>
				))}
			</div>
		</div>
	);
}
