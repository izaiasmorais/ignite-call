"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useUserNameForm } from "@/hooks/use-user-name-form";

export function UserNameForm() {
	const { form } = useUserNameForm();

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
					type="submit"
					className="bg-ignite-500 hover:bg-ignite-600 flex items-center gap-2 font-semibold"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting && (
						<LoaderCircle className="animate-spin" />
					)}

					{!form.formState.isSubmitting && (
						<>
							Avançar
							<ArrowRight />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
