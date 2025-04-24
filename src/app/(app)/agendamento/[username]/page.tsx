import { ScheduleForm } from "@/components/schedule/schedule-form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";

export default async function Schedule({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;

	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	if (!user) {
		return null;
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="w-full flex items-center flex-col ">
				<Avatar className="w-20 h-20">
					<AvatarImage
						src={user.avatar_url || undefined}
						alt={user.name}
						referrerPolicy="no-referrer"
					/>

					<AvatarFallback className="bg-gray-800 text-zinc-50 text-4xl">
						{user.name[0]}
					</AvatarFallback>
				</Avatar>

				<h1 className="text-2xl mt-2 font-semibold leading-tight">
					{user.name}
				</h1>

				<span className="text-muted-foreground">{user.bio}</span>
			</div>

			<div className="bg-gray-800 max-w-[824px] border border-gray-600 p-6 rounded-lg">
				<ScheduleForm username={username} />
			</div>
		</div>
	);
}
