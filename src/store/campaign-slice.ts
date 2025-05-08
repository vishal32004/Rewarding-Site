import { EmailTemplate, LandingPageTemplate } from "@/@types/Template.types";
import { StateCreator } from "zustand";
import axios from "axios";
import { Filters, Product } from "@/@types/Catalog.types";
import { DemoPoducts } from "@/data/form-products";

export interface CampaignFormStore {
    recipientType: Array<{ label: string; value: string }>;
    events: Array<{ label: string; value: string }>;
    recipient: string[];
    emailTemplates: EmailTemplate[];
    landingPageTemplates: LandingPageTemplate[];
    products: Product[];
    filteredProducts: Product[];
    selectedProducts: string[];
    filters: Filters;

    // Loading methods
    loadRecepientType: () => Promise<boolean>;
    loadEvents: (category: number) => Promise<boolean>;
    loadEmailTemplate: (category: string) => boolean;
    loadLandingPageTemplate: (category: string) => boolean;
    loadProducts: () => Promise<boolean>;

    // Filter methods
    applyFilters: (filters: Partial<Filters>) => void;
    resetFilters: () => void;
    toggleProductSelection: (productId: string) => void;
    clearSelectedProducts: () => void;
}

const initialState: Omit<
    CampaignFormStore,
    | 'loadEvents'
    | 'loadEmailTemplate'
    | 'loadLandingPageTemplate'
    | 'loadRecepientType'
    | 'loadProducts'
    | 'applyFilters'
    | 'resetFilters'
    | 'toggleProductSelection'
    | 'clearSelectedProducts'
> = {
    recipientType: [],
    events: [],
    recipient: [],
    emailTemplates: [],
    landingPageTemplates: [],
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

    loadRecepientType: async () => {
        // fetch the data
        return true;
    },

    loadEvents: async (categoryId: number) => {
        try {
            const response = await axios.post("http://localhost:3000/api/events", {
                recipient_type_id: categoryId,
            });

            const data = response.data;
            console.log(data, "Data");
            const events = data.map((event: any) => ({
                label: event.name,
                value: event.name,
            }));
            set({ events });
            return true;
        } catch (error) {
            console.error("Failed to load events:", error);
            return false;
        }
    },

    loadProducts: async () => {
        try {
            // In a real app, you would fetch this from an API


            set({
                products: DemoPoducts,
                filteredProducts: DemoPoducts, // Initially show all products
            });
            return true;
        } catch (error) {
            console.error("Failed to load products:", error);
            return false;
        }
    },

    applyFilters: (newFilters: Partial<Filters>) => {
        const { filters, products } = get();
        const updatedFilters = { ...filters, ...newFilters };

        // Apply filtering
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

    loadEmailTemplate: (category: string) => {
        console.log(category);
        const emailTemplates = [{
            id: "1",
            value: "1",
            title: "Birthday-1",
            category: "Birthday",
            subCategory: "Personal",
            imageUrl: "images/bbanner.webp",
            content: "Happy Birthday! Wishing you a fantastic day filled with joy and celebration.",
        }];
        set({ emailTemplates });
        return true;
    },

    loadLandingPageTemplate: (category: string) => {
        console.log(category);
        const landingPageTemplates = [{
            id: "registration",
            name: "Registration Thank You",
            category: "onboarding",
            thumbnail: "/placeholder.svg?height=200&width=300",
            elements: {
                logo: "/placeholder.svg?height=40&width=120",
                title: "Thank you for registering!",
                description: "We have a little something for you as a token of appreciation.",
                buttonText: "Claim your reward",
                buttonLink: "/claim",
                bannerImage:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/350c375-Screenshot_2024-05-13_at_6.27.57_PM-KsbDgU7JZ7Qc6WfKoSYk1Tk42EFdgq.png",
                footerText: "How to redeem?",
                textColor: "dark",
                buttonStyle: "primary",
                buttonSize: "default",
                textAlignment: "center",
                contentSpacing: "default",
                animation: "none",
                overlay: "none",
            },
        }];
        set({ landingPageTemplates });
        return true;
    },
});