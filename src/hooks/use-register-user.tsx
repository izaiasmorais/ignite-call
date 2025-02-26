"use client";
import { useMutation } from "@tanstack/react-query";
import { useFormMutation } from "./use-form-mutation";
import { registerUser } from "@/api/users/register-user";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const registerUserSchema = z.object({
	username: z
		.string()
		.min(3, "O usuário deve ter no mínimo 3 caracteres")
		.regex(/^([a-z\\-]+)$/i, "Digite um usuário válido")
		.transform((username) => username.toLowerCase()),
	name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
});

export function useRegisterUser() {
	const router = useRouter();

	const { mutate: registerUserFn, isPending: isLoadingRegisterUser } =
		useMutation({
			mutationFn: registerUser,
			mutationKey: ["register-user"],
			onSuccess: (data) => {
				if (data.success) {
					router.push("/registro/conectar-calendario");
				}

				if (data.error === "User Already Registered") {
					toast.error("Usuário já cadastrado");
				}
			},
		});

	const form = useFormMutation({
		schema: registerUserSchema,
		defaultValues: {
			username: "",
			name: "",
		},
		onSubmit: (data) => {
			registerUserFn({
				name: data.name,
				username: data.username,
			});
		},
	});

	return { form, isLoadingRegisterUser };
}
