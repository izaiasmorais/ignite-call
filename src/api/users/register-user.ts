import { HTTPErrorResponse, HTTPSucessResponse } from "@/@types/http";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

type RegisterUserRequestBody = {
	name: string;
	username: string;
};

type RegisterUserResponse = HTTPSucessResponse<null> | HTTPErrorResponse;

export async function registerUser(
	data: RegisterUserRequestBody
): Promise<RegisterUserResponse> {
	try {
		const response = await api.post<HTTPSucessResponse<null>>("/users", data);

		return response.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response?.data) {
			return error.response.data;
		}

		return {
			success: false,
			error: "Erro desconhecido",
			data: null,
		};
	}
}
