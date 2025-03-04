"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { useUpdateProfile } from "@/hooks/use-update-profile";
import { LoaderCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export function UpdateProfileForm() {
	const { form, isLoadingUpdateProfile } = useUpdateProfile();
	const session = useSession();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmitForm}
				className="flex flex-col items-start gap-4 bg-gray-800 rounded-md"
			>
				<div className="flex items-center gap-4 w-full">
					<Avatar className="w-20 h-20">
						<AvatarImage
							src={session.data?.user.avatar_url}
							alt={session.data?.user.name}
							referrerPolicy="no-referrer"
						/>

						<AvatarFallback className="bg-gray-900 text-zinc-50">
							{session.data?.user.username[0]}
						</AvatarFallback>
					</Avatar>

					<Input
						type="file"
						placeholder="Seleciona foto"
						className="bg-transparent border-ignite-500 text-ignite-500
										placeholder:text-ignite-500 file:text-ignite-500 hover:cursor-pointer"
					/>
				</div>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="flex-1 w-full">
							<FormLabel>Sobre você</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Fale um pouco sobre você. Isto será exibido em sua página pessoal."
									className="bg-gray-900 text-gray-50 border-none w-full"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="bg-ignite-500 hover:bg-ignite-600 flex items-center gap-2 font-semibold
					w-full"
					disabled={isLoadingUpdateProfile}
				>
					{isLoadingUpdateProfile && <LoaderCircle className="animate-spin" />}
					Finalizar
					{!isLoadingUpdateProfile && <ArrowRight />}
				</Button>
			</form>
		</Form>
	);
}
