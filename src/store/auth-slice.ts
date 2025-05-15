import { StateCreator } from "zustand";
import { LoginUser } from "@/@types/api/Auth.types";

export interface AuthStore {
    user: LoginUser | null;
    isAuthenticated: boolean;
    setAuth: (user: LoginUser) => void;
    clearAuth: () => void;
}

const initialState: Omit<
    AuthStore,
    | 'setAuth'
    | 'clearAuth'
> = {
    user: null,
    isAuthenticated: false,
};

export const createAuthSlice: StateCreator<AuthStore> = (set) => ({
    ...initialState,
    setAuth: (user) => set({ user, isAuthenticated: true }),
    clearAuth: () => set({ user: null, isAuthenticated: false }),
});