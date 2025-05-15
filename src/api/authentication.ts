import { LoginResponse, SignUpResponse } from "@/@types/api/Auth.types";
import axios, { AxiosError } from "axios";

import { BASE_URL } from "@/lib/constant";

interface SignUpData {
    company_name: string,
    name: string,
    email: string,
    mobile: string,
    number_of_employee: string,
}
interface LoginData {
    email: string,
    password: string
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

export const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, data);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<LoginResponse>;
        return {
            status: error.response?.status || 0,
            error: error.response?.data?.error || error.message,
            message: error.response?.data?.message || "Signup failed",
            User: undefined
        };
    }
};