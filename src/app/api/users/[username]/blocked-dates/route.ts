import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

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
	const month = req.nextUrl.searchParams.get("month");
	const year = req.nextUrl.searchParams.get("year");

	if (!year || !month) {
		return response.status(404).json({
			success: false,
			error: "Ano ou mês não informados",
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

	const availableWeekDays = await prisma.userTimeInterval.findMany({
		select: {
			week_day: true,
		},
		where: {
			user_id: user.id,
		},
	});

	const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
		return !availableWeekDays.some(
			(availableWeekDay) => availableWeekDay.week_day === weekDay
		);
	});

	return response.status(200).json({
		success: true,
		error: null,
		data: {
			blockedWeekDays,
		},
	});
}
