import { create } from 'zustand';
import { CampaignFormStore, createCampaignFormSlice } from './campaign-slice';
import { devtools, persist } from "zustand/middleware";
import { createAuthSlice, AuthStore } from "./auth-slice";

type RootStore = AuthStore & CampaignFormStore;

export const useAppStore = create<RootStore>()(
    devtools((...a) => ({
        // Persist only auth slice
        ...persist(createAuthSlice, {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        })(...a),

        // Don't persist campaign slice
        ...createCampaignFormSlice(...a),
    }))
);