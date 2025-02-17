import { useFormMutation } from "./use-form-mutation";
import { z } from "zod";

const RegisterUserSchema = z.object({
	username: z
		.string()
		.min(3, "O usuário deve ter no mínimo 3 caracteres")
		.regex(/^([a-z\\-]+)$/i, "Digite um usuário válido")
		.transform((username) => username.toLowerCase()),
	name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
});

export function useWelcomeForm() {
	const form = useFormMutation({
		schema: RegisterUserSchema,
		defaultValues: {
			username: "",
			name: "",
		},
		onSubmit: async ({ username }) => {
			console.log(username);
		},
	});

	return { form };
}
