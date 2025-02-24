import { registerUserSchema } from "@/hooks/use-register-user";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const response = {
	status(code: number) {
		return {
			json: (data: unknown) => NextResponse.json(data, { status: code }),
		};
	},
};

export async function POST(req: Request, res: Response) {
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
				error: "User Already Registered",
				data: null,
			});
		}

		const user = await prisma.user.create({
			data: {
				name,
				username,
			},
		});

		const cookieStore = await cookies();

		cookieStore.set({
			name: "@ingitecall:userId",
			value: user.id,
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // 7 days
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
