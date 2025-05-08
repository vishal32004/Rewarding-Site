export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    popularity: number;
    imageUrl?: string;
}

export interface Filters {
    category: string;
    minPrice: number;
    maxPrice: number;
    sortBy: "priceLowToHigh" | "priceHighToLow" | "popularity";
}
