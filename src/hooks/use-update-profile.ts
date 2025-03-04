"use client";
import { z } from "zod";
import { useFormMutation } from "./use-form-mutation";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/api/users/update-profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const updateProfileSchema = z.object({
	description: z
		.string()
		.min(10, "A descrição deve ter no mínimo 10 caracteres"),
});

export function useUpdateProfile() {
	const session = useSession();
	const router = useRouter();
	const form = useFormMutation({
		schema: updateProfileSchema,
		defaultValues: {
			description: "",
		},
		onSubmit: (data) => {
			updateProfileFn(data);
		},
	});

	const { mutateAsync: updateProfileFn, isPending: isLoadingUpdateProfile } =
		useMutation({
			mutationKey: ["update-profile"],
			mutationFn: updateProfile,
			onSuccess: (response) => {
				if (response.success) {
					toast.success("Perfil atualizado com sucesso");
					router.push(`/agendamento/${session.data?.user.username}`);
					return;
				}

				toast.error(response.error);
			},
		});

	return {
		form,
		isLoadingUpdateProfile,
	};
}
