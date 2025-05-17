import { StateCreator } from "zustand";
import { BusinessData, LoginUser, UserRegisterData } from "@/@types/api/Auth.types";

export interface AuthStore {
    user: LoginUser | null;
    userRegisterData: UserRegisterData | null;
    businessData: BusinessData | null;
    isAuthenticated: boolean;

    setAuth: (user: LoginUser) => void;
    clearAuth: () => void;
    setUserRegisterData: (data: UserRegisterData) => void;
    clearUserRegisterData: () => void;
    setBusinessData: (data: BusinessData) => void;
    clearBusinessData: () => void;
}

const initialState: Omit<
    AuthStore,
    | 'setAuth'
    | 'clearAuth'
    | 'setUserRegisterData'
    | 'clearUserRegisterData'
    | 'setBusinessData'
    | 'clearBusinessData'
> = {
    user: null,
    userRegisterData: null,
    businessData: null,
    isAuthenticated: false,
};

export const createAuthSlice: StateCreator<AuthStore> = (set) => ({
    ...initialState,

    setAuth: (user) => set({
        user,
        isAuthenticated: true
    }),
    clearAuth: () => set({
        user: null,
        isAuthenticated: false
    }),

    setUserRegisterData: (userRegisterData) => set({
        userRegisterData
    }),
    clearUserRegisterData: () => set({
        userRegisterData: null
    }),

    setBusinessData: (businessData) => set({
        businessData
    }),
    clearBusinessData: () => set({
        businessData: null
    }),
});