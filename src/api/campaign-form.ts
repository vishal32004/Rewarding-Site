import { FetchEventsResponse, FetchEventParentCategoryResponse } from "@/@types/api/Campaign-Form.types";
import { DemoPoducts } from "@/data/form-products";
import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchEventByParentId = async (id: number): Promise<FetchEventsResponse> => {
    try {
        const response = await axios.post<FetchEventsResponse>(`${BASE_URL}/eventsparentid`, { id });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<FetchEventsResponse>;
        return {
            status: 0,
            error: error.response?.data?.error || error.message,
            data: [],
        };
    }
};
export const fetchEventParentsCategory = async (): Promise<FetchEventParentCategoryResponse> => {
    try {
        const response = await axios.get<FetchEventParentCategoryResponse>(`${BASE_URL}/parentevents`);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<FetchEventParentCategoryResponse>;
        return {
            status: 0,
            error: error.response?.data?.error || error.message,
            data: [],
        };
    }
};

export const fetchFormProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    return DemoPoducts;
};