import { BasketItem } from "./basketItem";

export interface BasketData {
    id: number;
    buyerId: string;
    items: BasketItem[];
}