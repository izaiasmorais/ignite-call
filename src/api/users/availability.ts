import { HTTPErrorResponse, HTTPSucessResponse } from "@/@types/http";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

export type AvailabilityParams = {
	username: string;
	date: string;
};

export type Availability = {
	possibleTimes: number[];
	availableTimes: number[];
};

type GetAvailabilityResponse =
	| HTTPSucessResponse<Availability>
	| HTTPErrorResponse;

export async function getAvailability({
	username,
	date,
}: AvailabilityParams): Promise<GetAvailabilityResponse> {
	try {
		const response = await api.get<HTTPSucessResponse<Availability>>(
			`/users/${username}/availability`,
			{
				params: {
					date,
				},
			}
		);

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
