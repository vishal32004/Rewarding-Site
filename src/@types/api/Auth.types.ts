interface User {
    status: number;
    name: string;
    email: string;
    mobile: string;
    company_name: string;
    number_of_employee: string;
    created_at: string;
    updated_at: string;
    id: number;
}

export interface SignUpResponse {
    status: number;
    error: null | string;
    message: string;
    User?: User;
}