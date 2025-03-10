"use client";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "../ui/button";

const hours = [
	"00:00h",
	"01:00h",
	"02:00h",
	"03:00h",
	"04:00h",
	"05:00h",
	"06:00h",
	"07:00h",
	"08:00h",
	"09:00h",
	"10:00h",
	"11:00h",
	"12:00h",
	"13:00h",
	"14:00h",
	"15:00h",
	"16:00h",
	"17:00h",
];

export function ScheduleForm() {
	const [date, setDate] = useState<Date | undefined>(undefined);

	return (
		<div className="h-[480px] flex gap-2">
			<ShadcnCalendar
				mode="single"
				selected={date}
				onSelect={setDate}
				disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
			/>

			{date && (
				<div className="!w-[280px] p-1.5 flex flex-col gap-2">
					<span className="w-full text-muted-foreground">
						<strong className="text-white">terça-feira</strong>, 20 de setembro
					</span>

					<div className="schedule-buttons flex flex-col gap-2 overflow-y-scroll">
						{hours.map((hour) => (
							<Button key={hour} className="bg-gray-600 hover:bg-gray-600/60">
								{hour}
							</Button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
