export interface EventItem {
    id: number;
    title: string;
    parent_id: number;
    status: number;
    icon: string | null;
    ordering: number | null;
    created_at: string;
    updated_at: string;
    children: EventItem[];
}

export interface FetchEventsResponse {
    status: number;
    error: string | null;
    data: EventItem[];
}

interface EventParentCategoryItem {
    id: number;
    title: string;
    parent_id: number | null;
    status: number;
    icon: string | null;
    ordering: number | null;
    created_at: string;
    updated_at: string;
}

export interface FetchEventParentCategoryResponse {
    status: number;
    error: null | string;
    data: EventParentCategoryItem[];
}