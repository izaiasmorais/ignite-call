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
import { Button } from "@/components/ui/button";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRegisterUser } from "@/hooks/use-register-user";

export function WelcomeForm() {
	const searchParams = useSearchParams();
	const { form, isLoadingRegisterUser } = useRegisterUser();

	useEffect(() => {
		const usernameFromQuery = searchParams.get("username");
		if (usernameFromQuery) {
			form.setValue("username", usernameFromQuery);
		}
	}, [searchParams, form]);

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
					type="submit"
					className="bg-ignite-500 hover:bg-ignite-600 flex items-center gap-2 font-semibold w-full"
				>
					{isLoadingRegisterUser && <LoaderCircle className="animate-spin" />}

					{!isLoadingRegisterUser && (
						<>
							Avançar <ArrowRight />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
