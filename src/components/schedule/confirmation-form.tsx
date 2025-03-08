"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Calendar, Clock } from "lucide-react";
import { useConfirmationForm } from "@/hooks/use-confirmation-form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function ConfirmationForm() {
	const { form } = useConfirmationForm();

	return (
		<div className="w-[540px] flex flex-col gap-2">
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<Calendar size={20} className="text-muted-foreground" />
					07 de Março de 2025
				</div>

				<div className="flex items-center gap-2">
					<Clock size={20} className="text-muted-foreground" />
					16:00h
				</div>
			</div>

			<Separator className="border border-gray-600 my-4" />

			<Form {...form}>
				<form className="space-y-4" onSubmit={form.handleSubmitForm}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex-1 w-full">
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										placeholder="ignite.com/seu-usuário"
										className="bg-gray-900 border-none focus-visible:ring-offset-0
										focus-visible:ring-ignite-500 focus-visible:ring-1"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="flex-1 w-full">
								<FormLabel>Endereço de e-mail</FormLabel>
								<FormControl>
									<Input
										placeholder="John Doe"
										className="bg-gray-900 border-none focus-visible:ring-offset-0
										focus-visible:ring-ignite-500 focus-visible:ring-1"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="observations"
						render={({ field }) => (
							<FormItem className="flex-1 w-full">
								<FormLabel>Observações</FormLabel>
								<FormControl>
									<Textarea
										placeholder=""
										className="bg-gray-900 text-gray-50 border-none w-full focus-visible:ring-offset-0
										focus-visible:ring-ignite-500 focus-visible:ring-1"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex w-full items-center gap-2 justify-end">
						<Button
							variant="ghost"
							className="w-[100px] hover:bg-transparent hover:text-white hover:opacity-80"
						>
							Cancelar
						</Button>

						<Button
							type="submit"
							className="bg-ignite-500 hover:bg-ignite-600 w-[100px]"
						>
							Confirmar
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
