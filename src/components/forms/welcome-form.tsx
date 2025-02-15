"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const RegisterUserSchema = z.object({
	username: z
		.string()
		.min(3, "O usuário deve ter no mínimo 3 caracteres")
		.regex(/^([a-z\\-]+)$/i, "Digite um usuário válido")
		.transform((username) => username.toLowerCase()),
	name: z
		.string()
		.min(3, "O nome deve ter no mínimo 3 caracteres")
		.regex(/^([a-z\\-]+)$/i, "Digite um usuário válido"),
});

export function WelcomeForm() {
	const router = useRouter();

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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmitForm}
				className="flex flex-col items-start w-full gap-4 bg-gray-800 p-6 rounded-md mt-4"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Nome de usuário</FormLabel>
							<FormControl>
								<Input
									placeholder="ignite.com/seu-usuário"
									className="bg-gray-900 border-none outline-none ring-ignite-500
									focus:outline-none focus:ring-2"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Nome completo</FormLabel>
							<FormControl>
								<Input
									placeholder="Seu nome"
									className="bg-gray-900 border-none outline-none ring-ignite-500
									focus:outline-none focus:ring-2"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					onClick={() => router.push("/registro")}
					type="submit"
					className="bg-ignite-500 hover:bg-ignite-600 flex items-center gap-2 font-semibold w-full"
				>
					Avançar
					<ArrowRight />
				</Button>
			</form>
		</Form>
	);
}
