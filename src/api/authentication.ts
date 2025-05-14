import { SignUpResponse } from "@/@types/api/Auth.types";
import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
interface SignUpData {
    company_name: string,
    name: string,
    email: string,
    mobile: string,
    number_of_employee: string,
}
export const signUp = async (data: SignUpData): Promise<SignUpResponse> => {
    try {
        const response = await axios.post<SignUpResponse>(`${BASE_URL}/lead`, data);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<SignUpResponse>;
        return {
            status: error.response?.status || 0,
            error: error.response?.data?.error || error.message,
            message: error.response?.data?.message || "Signup failed",
        };
    }
};