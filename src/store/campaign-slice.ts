import { StateCreator } from "zustand";
// import axios from "axios";
import { Filters, Product } from "@/@types/Catalog.types";

export interface CampaignFormStore {
    products: Product[];
    filteredProducts: Product[];
    selectedProducts: string[];
    filters: Filters;
    // Filter methods
    applyFilters: (filters: Partial<Filters>) => void;
    resetFilters: () => void;
    toggleProductSelection: (productId: string) => void;
    clearSelectedProducts: () => void;
}

const initialState: Omit<
    CampaignFormStore,
    | 'applyFilters'
    | 'resetFilters'
    | 'toggleProductSelection'
    | 'clearSelectedProducts'
> = {
    products: [],
    filteredProducts: [],
    selectedProducts: [],
    filters: {
        category: "all",
        minPrice: 0,
        maxPrice: 1000,
        sortBy: "priceLowToHigh",
    },
};

export const createCampaignFormSlice: StateCreator<CampaignFormStore> = (set, get) => ({
    ...initialState,
    applyFilters: (newFilters: Partial<Filters>) => {
        const { filters, products } = get();
        const updatedFilters = { ...filters, ...newFilters };

        const filtered = products.filter((product) => {
            return (
                (updatedFilters.category === "all" || product.category === updatedFilters.category) &&
                product.price >= updatedFilters.minPrice &&
                product.price <= updatedFilters.maxPrice
            );
        });


        // Apply sorting
        if (updatedFilters.sortBy === "priceLowToHigh") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (updatedFilters.sortBy === "priceHighToLow") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (updatedFilters.sortBy === "popularity") {
            filtered.sort((a, b) => b.popularity - a.popularity);
        }

        set({
            filteredProducts: filtered,
            filters: updatedFilters,
        });
    },

    resetFilters: () => {
        const { products } = get();
        set({
            filters: initialState.filters,
            filteredProducts: products,
        });
    },

    toggleProductSelection: (productId: string) => {
        const { selectedProducts } = get();
        const newSelection = selectedProducts.includes(productId)
            ? selectedProducts.filter((id) => id !== productId)
            : [...selectedProducts, productId];

        set({ selectedProducts: newSelection });
    },

    clearSelectedProducts: () => {
        set({ selectedProducts: [] });
    },
});