"use client";
import { useRouter } from "next/navigation";
import { useFormMutation } from "./use-form-mutation";
import { z } from "zod";

const UserNameSchema = z.object({
	username: z
		.string()
		.min(3, "O usuário deve ter no mínimo 3 caracteres")
		.regex(/^([a-z\\-]+)$/i, "Digite um usuário válido")
		.transform((username) => username.toLowerCase()),
});

export function useUserNameForm() {
	const router = useRouter();

	const form = useFormMutation({
		schema: UserNameSchema,
		defaultValues: {
			username: "",
		},
		onSubmit: async ({ username }) => {
			router.push(`/registro?username=${username}`);
		},
	});

	return { form };
}
