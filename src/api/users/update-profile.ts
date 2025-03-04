import { HTTPErrorResponse, HTTPSucessResponse } from "@/@types/http";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

type UpdateProfileRequestBody = {
	description: string;
};

type UpdateProfileResponse = HTTPSucessResponse<null> | HTTPErrorResponse;

export async function updateProfile(
	data: UpdateProfileRequestBody
): Promise<UpdateProfileResponse> {
	try {
		const response = await api.put<HTTPSucessResponse<null>>("/users/profile", {
			description: data.description,
		});

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
