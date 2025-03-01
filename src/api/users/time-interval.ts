import { HTTPErrorResponse, HTTPSucessResponse } from "@/@types/http";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

type TimeInterval = {
	weekDay: number;
	startTimeInMinutes: number;
	endTimeInMinutes: number;
};

type CreateTimeIntervalsRequestBody = TimeInterval[];

type CreateTimeIntervalsResponse = HTTPSucessResponse<null> | HTTPErrorResponse;

export async function createTimeIntervals(
	data: CreateTimeIntervalsRequestBody
): Promise<CreateTimeIntervalsResponse> {
	try {
		const response = await api.post<HTTPSucessResponse<null>>(
			"/users/time-interval",
			data
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
