import { PrismaAdapter } from "@/lib/auth/prisma-adapter";
import { env } from "@/env";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { type AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
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
			profile(profile: GoogleProfile) {
				return {
					id: profile.sub,
					name: profile.name,
					username: "",
					email: profile.email,
					avatar_url: profile.picture,
				};
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
};
