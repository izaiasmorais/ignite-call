import { registerUserSchema } from "@/hooks/use-register-user";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const response = {
	status(code: number) {
		return {
			json: (data: unknown) => NextResponse.json(data, { status: code }),
		};
	},
};

export async function POST(req: Request) {
	try {
		const { name, username } = registerUserSchema.parse(await req.json());

		const isUserAlreadyRegistered = await prisma.user.findFirst({
			where: {
				username,
			},
		});

		if (isUserAlreadyRegistered) {
			return response.status(400).json({
				success: false,
				error: "Invalid Credentials",
				data: null,
			});
		}

		await prisma.user.create({
			data: {
				name,
				username,
			},
		});

		return response.status(201).json({
			success: true,
			error: null,
			data: null,
		});
	} catch (error) {
		return response.status(500).json({
			success: false,
			error: "Internal Server Error",
			data: null,
		});
	}
}
