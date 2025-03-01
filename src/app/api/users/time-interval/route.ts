import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const userSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	username: z.string(),
	email: z.string().email(),
	avatar_url: z.string().url(),
	emailVerified: z.date().nullable(),
});

const createTimeIntervalsRequestBodySchema = z.array(
	z.object({
		weekDay: z.number(),
		startTimeInMinutes: z.number(),
		endTimeInMinutes: z.number(),
	})
);

const response = {
	status(code: number) {
		return {
			json: (data: unknown) => NextResponse.json(data, { status: code }),
		};
	},
};

export async function POST(req: Request) {
	const body = await req.json();

	const intervals = createTimeIntervalsRequestBodySchema.parse(body);

	const session = await getServerSession(authOptions);

	const userInfo = userSchema.parse(session?.user);

	await Promise.all(
		intervals.map((interval) => {
			return prisma.userTimeInterval.create({
				data: {
					week_day: interval.weekDay,
					time_start_in_minutes: interval.startTimeInMinutes,
					time_end_in_minutes: interval.endTimeInMinutes,
					user_id: userInfo.id,
				},
			});
		})
	);

	return response.status(201).json({
		success: true,
		error: null,
		data: null,
	});
}
