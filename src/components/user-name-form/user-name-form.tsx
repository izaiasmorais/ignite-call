"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const UserNameSchema = z.object({
	username: z
		.string()
		.min(3, "O usuário deve ter no mínimo 3 caracteres")
		.regex(/^([a-z\\-]+)$/i, "Digite um usuário válido")
		.transform((username) => username.toLowerCase()),
});

export function UserNameForm() {
	const router=  useRouter()

	const form = useFormMutation({
		schema: UserNameSchema,
		defaultValues: {
			username: "",
		},
		onSubmit: async ({ username }) => {
			toast.success(username);
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmitForm}
				className="flex items-start w-[450px] gap-2 bg-gray-800 p-4 rounded-md mt-4"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Input
									placeholder="ignite.com/seu-usuário"
									className="bg-black border-none outline-none ring-ignite-500
									focus:outline-none focus:ring-2 flex-1"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					onClick={() => router.push('/registro')}
					type="submit"
					className="bg-ignite-500 hover:bg-ignite-600 flex items-center gap-2 font-semibold"
				>
					Submit
					<ArrowRight />
				</Button>
			</form>
		</Form>
	);
}
