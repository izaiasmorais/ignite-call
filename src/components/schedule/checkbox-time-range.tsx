"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { z } from "zod";

const weekdays = [
	{ id: 0, label: "Segunda-feira" },
	{ id: 1, label: "Terça-feira" },
	{ id: 2, label: "Quarta-feira" },
	{ id: 3, label: "Quinta-feira" },
	{ id: 4, label: "Sexta-feira" },
	{ id: 5, label: "Sábado" },
	{ id: 6, label: "Domingo" },
];

const FormSchema = z.object({
	schedule: z.array(
		z.object({
			day: z.number(),
			enabled: z.boolean(),
			startTime: z.string(),
			endTime: z.string(),
		})
	),
});

export default function CheckboxTimeRange() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			schedule: weekdays.map((day) => ({
				day: day.id,
				enabled: [0, 1, 2, 3, 4, 5, 6].includes(day.id),
				startTime: "08:00",
				endTime: "18:00",
			})),
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
				<div className="border border-gray-600 rounded-lg overflow-hidden">
					{form.getValues().schedule.map((schedule, index) => (
						<div
							key={schedule.day}
							className="flex justify-between items-center space-x-4 px-4 py-2
								bg-gray-800 border-b border-gray-600"
						>
							<Controller
								name={`schedule.${index}.enabled`}
								control={form.control}
								render={({ field }) => (
									<div className="flex items-center space-x-2">
										<Checkbox
											id={String(schedule.day)}
											checked={field.value}
											onCheckedChange={field.onChange}
											className={
												field.value
													? "!bg-ignite-500 border-ignite-500 text-white w-5 h-5"
													: "border-gray-900 bg-gray-900 w-5 h-5"
											}
										/>

										<FormLabel
											htmlFor={String(schedule.day)}
											className={`text-base font-medium ${
												field.value ? "text-white" : "text-gray-400"
											}`}
										>
											{weekdays.find((day) => day.id === schedule.day)?.label}
										</FormLabel>
									</div>
								)}
							/>

							<div className="ml-auto flex space-x-2">
								<Controller
									name={`schedule.${index}.startTime`}
									control={form.control}
									render={({ field }) => (
										<Input
											type="time"
											{...field}
											step={60}
											className="p-2 rounded-md text-center bg-gray-900
											time-white text-white border border-gray-800"
										/>
									)}
								/>

								<Controller
									name={`schedule.${index}.endTime`}
									control={form.control}
									render={({ field }) => (
										<Input
											type="time"
											{...field}
											step={60}
											className="p-2 rounded-md text-center bg-gray-900
											time-white text-white border border-gray-800"
										/>
									)}
								/>
							</div>
						</div>
					))}
				</div>

				<Button className="bg-ignite-500 hover:bg-ignite-600 w-full">
					Próximo Passo <ArrowRight />
				</Button>
			</form>
		</Form>
	);
}
