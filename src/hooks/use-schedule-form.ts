import { z } from "zod";
import { useFormMutation } from "./use-form-mutation";
import { convertTimeStringToMiinues } from "@/utils/conver-time-string-to-minutes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const weekdays = [
	{ id: 0, label: "Domingo" },
	{ id: 1, label: "Segunda-feira" },
	{ id: 2, label: "Terça-feira" },
	{ id: 3, label: "Quarta-feira" },
	{ id: 4, label: "Quinta-feira" },
	{ id: 5, label: "Sexta-feira" },
	{ id: 6, label: "Sábado" },
];

const timeIntervalsFormSchema = z.object({
	schedule: z
		.array(
			z.object({
				weekday: z.number().min(0).max(6),
				enabled: z.boolean(),
				startTime: z.string(),
				endTime: z.string(),
			})
		)
		.transform((intervals) => intervals.filter((interval) => interval.enabled))
		.refine((intervals) => intervals.length > 0, {
			message: "Pelo menos um dia da semana deve ser selecionado.",
		})
		.transform((intervals) => {
			return intervals.map((interval) => {
				return {
					weekDay: interval.weekday,
					startTimeInMinutes: convertTimeStringToMiinues(interval.startTime),
					endTimeInMinutes: convertTimeStringToMiinues(interval.endTime),
				};
			});
		})
		.refine(
			(interval) => {
				return interval.every(
					(interval) =>
						interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes
				);
			},
			{
				message: "O intervalo de tempo deve ser de pelo menos 1 hora.",
			}
		),
});

export function useScheduleForm() {
	const defaultWeekDays: number[] = [];

	// @ts-ignore
	const form = useFormMutation<ScheduleFormInput>({
		// @ts-ignore
		schema: timeIntervalsFormSchema,
		defaultValues: {
			schedule: weekdays.map((weekday) => ({
				weekday: weekday.id,
				enabled: defaultWeekDays.includes(weekday.id),
				startTime: "08:00",
				endTime: "18:00",
			})),
		},
		onSubmit: async (data) => {
			console.log(data);
		},
	});

	return {
		form,
		weekdays,
	};
}
