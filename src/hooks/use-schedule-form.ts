import { z } from "zod";
import { useFormMutation } from "./use-form-mutation";
import { convertTimeStringToMinutes } from "@/utils/conver-time-string-to-minutes";

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
					startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
					endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
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

type TimeIntervalsFormOutput = z.input<typeof timeIntervalsFormSchema>;

export function useScheduleForm() {
	const defaultWeekDays: number[] = [];

	const form = useFormMutation<TimeIntervalsFormOutput>({
		// @ts-expect-error: TODO
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
