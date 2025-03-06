"use client";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { useState } from "react";

export function ScheduleForm() {
	const [date, setDate] = useState<Date[] | undefined>([new Date()]);

	return (
		<div>
			<ShadcnCalendar mode="multiple" selected={date} onSelect={setDate} />
		</div>
	);
}
