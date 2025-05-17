import { ChangePasswordResponse, ProfileUpdateResponse, UserDetailsResponse } from "@/@types/api/Auth.types";
import { ProfileUpdateFormValues } from "@/components/Form/ProfileUpdateForm"
import { ChangePasswordFormValues } from "@/components/Form/ChangePasswordForm";
import { BASE_URL } from "@/lib/constant";
import axios, { AxiosError } from "axios";

export const changePassword = async (data: ChangePasswordFormValues): Promise<ChangePasswordResponse> => {
    try {
        console.log(data, "data")
        const response = await axios.post<ChangePasswordResponse>(`${BASE_URL}/change-password`, data);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<ChangePasswordResponse>;
        return {
            status: 0,
            error: error.response?.data?.error || error.message,
            data: undefined,
        };
    }
};

export const updateProfile = async (data: ProfileUpdateFormValues): Promise<ProfileUpdateResponse> => {
    try {
        const response = await axios.post<ProfileUpdateResponse>(`${BASE_URL}/profile`, data);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<ProfileUpdateResponse>;
        return {
            status: 0,
            error: error.response?.data?.error || error.message,
            message: 'Some Error Occured',
        };
    }
}

export const fetchUserDetails = async (email: string): Promise<UserDetailsResponse> => {
    try {
        const response = await axios.post<UserDetailsResponse>(`${BASE_URL}/user-details`, {
            email
        });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<UserDetailsResponse>;
        return {
            status: 0,
            error: error.response?.data?.error || error.message,
            message: 'Some Error Occured',
        };
    }
}