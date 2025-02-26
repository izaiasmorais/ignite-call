import { PrismaAdapter } from "@/lib/auth/prisma-adapter";
import { env } from "@/env";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

const handler = NextAuth({
	adapter: PrismaAdapter(),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					scope:
						"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
				},
			},
		}),
	],
	callbacks: {
		async signIn({ account }) {
			if (
				!account?.scope?.includes("https://www.googleapis.com/auth/calendar")
			) {
				return "/registro/conectar-calendario?error=persmissions";
			}

			return true;
		},
		async session({ session, user }) {
			return {
				...session,
				user,
			};
		},
	},
});

export { handler as GET, handler as POST };
