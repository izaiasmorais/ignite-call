"use client";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";
import dayjs from "dayjs";
import { getAvailability } from "@/api/users/availability";

interface Availability {
	possibleTimes: number[];
	availableTimes: number[];
}

interface ScheduleFormProps {
	username: string;
}

export function ScheduleForm({ username }: ScheduleFormProps) {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [availability, setAvailability] = useState<Availability | null>(null);

	useEffect(() => {
		if (!selectedDate) {
			return;
		}

		const handleGetAvailability = async () => {
			const response = await getAvailability({
				username,
				date: dayjs(selectedDate).format("YYYY-MM-DD"),
			});

			setAvailability(response.data);
		};

		handleGetAvailability();
	}, [selectedDate, username]);

	return (
		<div className="h-[480px] flex gap-2">
			<ShadcnCalendar
				mode="single"
				selected={selectedDate}
				onSelect={setSelectedDate}
				disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
			/>

			{selectedDate && (
				<div className="!w-[280px] p-1.5 flex flex-col gap-2">
					<span className="w-full text-muted-foreground">
						<strong className="text-white">terça-feira</strong>, 20 de setembro
					</span>

					<div className="schedule-buttons flex flex-col gap-2 overflow-y-scroll">
						{availability?.possibleTimes.map((hour) => (
							<Button
								key={hour}
								className="bg-gray-600 hover:bg-gray-600/60"
								disabled={!availability?.possibleTimes.includes(hour)}
							>
								{String(hour).padStart(2, "0")}:00
							</Button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
