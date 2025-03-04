import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const response = {
	status(code: number) {
		return {
			json: (data: unknown) => NextResponse.json(data, { status: code }),
		};
	},
};

export async function POST(req: Request) {
	const { name, username } = await req.json();

	const isUserAlreadyRegistered = await prisma.user.findFirst({
		where: {
			username,
		},
	});

	if (isUserAlreadyRegistered) {
		return response.status(400).json({
			success: false,
			error: "Usuário já cadastrado",
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
		maxAge: 60 * 60 * 24 * 7,
	});

	return response.status(201).json({
		success: true,
		error: null,
		data: null,
	});
}
