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

const updateProfileBodySchema = z.object({
	description: z
		.string()
		.min(10, "A descrição deve ter no mínimo 10 caracteres"),
});

const response = {
	status(code: number) {
		return {
			json: (data: unknown) => NextResponse.json(data, { status: code }),
		};
	},
};

export async function PUT(req: Request) {
	const body = await req.json();

	const { description } = updateProfileBodySchema.parse(body);

	const session = await getServerSession(authOptions);

	if (!session) {
		return response.status(401).json({
			success: false,
			error: "Unauthorized",
			data: null,
		});
	}

	const userInfo = userSchema.parse(session.user);

	const user = await prisma.user.findUnique({
		where: {
			id: userInfo.id,
		},
	});

	if (!user) {
		return response.status(404).json({
			success: false,
			error: "Usuário não encontrado",
			data: null,
		});
	}

	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			bio: description,
		},
	});

	return response.status(200).json({
		success: true,
		error: null,
		data: null,
	});
}
