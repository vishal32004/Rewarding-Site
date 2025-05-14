import { FetchEventsResponse } from "@/@types/api/events.types";
import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchEventByParentId = async (id: number): Promise<FetchEventsResponse> => {
    try {
        const response = await axios.post<FetchEventsResponse>(`${BASE_URL}/eventsparentid`,{id});
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