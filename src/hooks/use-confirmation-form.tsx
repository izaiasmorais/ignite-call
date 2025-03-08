"use client";
import { z } from "zod";
import { useFormMutation } from "./use-form-mutation";
import { useMutation } from "@tanstack/react-query";

const confirmationSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	email: z.string().email("E-mail inválido"),
	observations: z.string(),
});

export function useConfirmationForm() {
	const form = useFormMutation({
		schema: confirmationSchema,
		defaultValues: {
			name: "",
			email: "",
			observations: "",
		},
		onSubmit: (data) => {
			console.log(data);
		},
	});

	// const { mutateAsync: confirmDataFn, isPending: isLoadingConfirmation } =
	// 	useMutation({
	// 		mutationKey: ["confirm-data"],
	// 		mutationFn: confirmData,
	// 		onSuccess: () => {},
	// 	});

	return {
		form,
		// isLoadingConfirmation,
	};
}
