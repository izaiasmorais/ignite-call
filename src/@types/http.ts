export type HTTPErrorResponse = {
	success: false;
	error: string;
	data: null;
};

export type HTTPSucessResponse<T> = {
	success: true;
	error: null;
	data: T;
};
