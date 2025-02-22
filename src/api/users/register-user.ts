import { api } from "@/lib/axios";

export interface RegisterUserRequestBody {
	username: string;
	name: string;
}

export interface RegisterUserResponseBody {
	username: string;
	name: string;
}

export async function registerUser(data: RegisterUserRequestBody) {
	try {
		const response = await api.post("/users", data);

		return response.data;
	} catch (error) {
		throw error;
	}
}
