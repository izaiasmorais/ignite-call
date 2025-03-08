"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ptBR } from "date-fns/locale/pt-BR";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			locale={ptBR}
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				nav: "space-x-1 flex items-center",
				nav_button: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 p-0 bg-gray-800 border-none hover:text-white text-white hover:bg-[#323238]"
				),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full bg-gray-800 border-collapse space-y-1",
				head_row: "flex",
				head_cell:
					"text-gray-200 font-semibold uppercase rounded-md w-full font-normal text-[0.8rem]",
				row: "flex w-full mt-2",
				cell: "w-[66px] outline-none h-[58px] px-1 p-0.5 !bg-gray-800 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
				day: cn(
					buttonVariants({ variant: "ghost" }),
					"w-full h-full p-0 bg-gray-800 hover:bg-[#323238] hover:text-white font-normal aria-selected:opacity-100"
				),
				day_range_end: "day-range-end",
				day_selected:
					"bg-gray-900 hover:bg-gray-900 text-white hover:text-white focus:text-white",
				day_outside:
					"day-outside text-muted-foreground aria-selected:text-muted-foreground",
				day_disabled: "text-muted-foreground opacity-50",
				day_range_middle:
					"aria-selected:bg-accent aria-selected:text-accent-foreground",
				day_hidden: "invisible",
				...classNames,
			}}
			components={{
				IconLeft: ({ className, ...props }) => (
					<ChevronLeft className={cn("h-4 w-4", className)} {...props} />
				),
				IconRight: ({ className, ...props }) => (
					<ChevronRight className={cn("h-4 w-4", className)} {...props} />
				),
			}}
			{...props}
		/>
	);
}

Calendar.displayName = "Calendar";

export { Calendar };
