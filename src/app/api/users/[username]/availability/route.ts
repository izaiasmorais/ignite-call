import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

const response = {
	status(code: number) {
		return {
			json: (data: unknown) => NextResponse.json(data, { status: code }),
		};
	},
};

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ username: string }> }
) {
	const resolvedParams = await params;
	const username = resolvedParams.username;
	const date = req.nextUrl.searchParams.get("date");
	console.log(username);

	if (!date) {
		return response.status(404).json({
			success: false,
			error: "Data não informada",
			data: null,
		});
	}

	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	if (!user) {
		return response.status(404).json({
			success: false,
			error: "Usuário não encontrado",
			data: null,
		});
	}

	const referenceDate = dayjs(String(date));
	const isPastDate = referenceDate.endOf("day").isBefore(new Date());

	if (isPastDate) {
		return response.status(200).json({
			success: true,
			error: null,
			data: {
				availability: [],
			},
		});
	}

	const userAvailability = await prisma.userTimeInterval.findFirst({
		where: {
			user_id: user.id,
			week_day: referenceDate.get("day"),
		},
	});

	if (!userAvailability) {
		return response.status(200).json({
			success: true,
			error: null,
			data: {
				availability: [],
			},
		});
	}

	const { time_end_in_minutes, time_start_in_minutes } = userAvailability;

	const startHour = time_start_in_minutes / 60;
	const endHour = time_end_in_minutes / 60;

	const possibleTimes = Array.from({ length: endHour - startHour }).map(
		(_, i) => {
			return startHour + i;
		}
	);

	return response.status(200).json({
		success: true,
		error: null,
		data: possibleTimes,
	});
}
