"use client";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSetTimeIntervals } from "@/hooks/use-set-time-intervals";

export default function CheckboxTimeRange() {
	const { form, weekdays } = useSetTimeIntervals();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmitForm} className="space-y-4 w-full">
				<div className="border border-gray-600 rounded-lg overflow-hidden">
					{form.getValues().schedule.map((schedule, index) => (
						<div
							key={schedule.weekday}
							className="flex justify-between items-center space-x-4 px-4 py-2
								bg-gray-800 border-b border-gray-600"
						>
							<Controller
								name={`schedule.${index}.enabled`}
								control={form.control}
								render={({ field }) => (
									<div className="flex items-center space-x-2">
										<Checkbox
											id={String(schedule.weekday)}
											checked={field.value}
											onCheckedChange={(e) => [
												field.onChange(e),
												form.clearErrors(),
											]}
											className={
												field.value
													? "!bg-ignite-500 border-ignite-500 text-white w-5 h-5"
													: "border-gray-900 bg-gray-900 w-5 h-5"
											}
										/>

										<FormLabel
											htmlFor={String(schedule.weekday)}
											className={`text-base font-medium ${
												field.value ? "text-white" : "text-gray-400"
											}`}
										>
											{
												weekdays.find((day) => day.id === schedule.weekday)
													?.label
											}
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
											disabled={!schedule.enabled}
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
											{...field}
											type="time"
											step={60}
											disabled={!schedule.enabled}
											className="p-2 rounded-md text-center bg-gray-900
											time-white text-white border border-gray-800"
										/>
									)}
								/>
							</div>
						</div>
					))}
				</div>

				{form.formState.errors.schedule && (
					<span className="text-red-500 block">
						{form.formState.errors.schedule.root?.message}
					</span>
				)}

				<FormMessage />

				<Button
					type="submit"
					className="bg-ignite-500 hover:bg-ignite-600 w-full"
					disabled={form.formState.isSubmitting}
				>
					Próximo Passo <ArrowRight />
				</Button>
			</form>
		</Form>
	);
}
