import { Adapter, AdapterUser, AdapterAccount } from "next-auth/adapters";
import { prisma } from "../prisma";
import { cookies } from "next/headers";

export function PrismaAdapter(): Adapter {
	return {
		async createUser(user: AdapterUser) {
			const cookieStore = await cookies();

			const userId = cookieStore.get("@ingitecall:userId")?.value;

			if (!userId) {
				throw new Error("User not found");
			}

			const prismaUser = await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					name: user.name,
					email: user.email,
					avatar_url: user.avatar_url,
				},
			});

			cookieStore.delete({
				name: "@ingitecall:userId",
				path: "/",
			});

			return {
				id: prismaUser.id,
				name: prismaUser.name,
				username: prismaUser.username,
				email: prismaUser.email!,
				avatar_url: prismaUser.avatar_url!,
				emailVerified: null,
			};
		},

		async getUser(id) {
			const user = await prisma.user.findUnique({
				where: {
					id,
				},
			});

			if (!user) {
				return null;
			}

			return {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email!,
				avatar_url: user.avatar_url!,
				emailVerified: null,
			};
		},

		async getUserByEmail(email) {
			const user = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (!user) {
				return null;
			}

			return {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email!,
				avatar_url: user.avatar_url!,
				emailVerified: null,
			};
		},

		async getUserByAccount({ providerAccountId, provider }) {
			const account = await prisma.account.findUnique({
				where: {
					provider_provider_account_id: {
						provider,
						provider_account_id: providerAccountId,
					},
				},
				include: {
					user: true,
				},
			});

			if (!account) {
				return null;
			}

			const { user } = account;

			return {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email!,
				avatar_url: user.avatar_url!,
				emailVerified: null,
			};
		},

		async updateUser(user) {
			const prismaUser = await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					name: user.name,
					email: user.email,
					avatar_url: user.avatar_url,
				},
			});

			return {
				id: prismaUser.id,
				name: prismaUser.name,
				username: prismaUser.username,
				email: prismaUser.email!,
				avatar_url: prismaUser.avatar_url!,
				emailVerified: null,
			};
		},

		async linkAccount(account: AdapterAccount) {
			await prisma.account.create({
				data: {
					user_id: account.userId,
					type: account.type,
					provider: account.provider,
					provider_account_id: account.providerAccountId,
					scope: account.scope,
					access_token: account.access_token,
					refresh_token: account.refresh_token,
					expires_at: account.expires_at
						? new Date(account.expires_at * 1000)
						: null,
					token_type: account.token_type,
					id_token: account.id_token,
					session_state: account.session_state,
				},
			});
		},

		async createSession({ sessionToken, userId, expires }) {
			await prisma.session.create({
				data: {
					user_id: userId,
					expires: expires,
					session_token: sessionToken,
				},
			});

			return {
				userId,
				sessionToken,
				expires,
			};
		},

		async deleteSession(sessionToken) {
			await prisma.session.delete({
				where: {
					session_token: sessionToken,
				},
			});
		},

		async getSessionAndUser(sessionToken) {
			const prismaSession = await prisma.session.findUnique({
				where: {
					session_token: sessionToken,
				},
				include: {
					user: true,
				},
			});

			if (!prismaSession) {
				return null;
			}

			const { user, ...session } = prismaSession;

			return {
				session: {
					userId: session.user_id,
					expires: session.expires,
					sessionToken: session.session_token,
				},
				user: {
					id: user.id,
					name: user.name,
					username: user.username,
					email: user.email!,
					avatar_url: user.avatar_url!,
					emailVerified: null,
				},
			};
		},

		async updateSession({ sessionToken, userId, expires }) {
			const prismaSession = await prisma.session.update({
				where: {
					session_token: sessionToken,
				},
				data: {
					expires,
					user_id: userId,
				},
			});

			return {
				sessionToken: prismaSession.session_token,
				userId: prismaSession.user_id,
				expires: prismaSession.expires,
			};
		},
	};
}
