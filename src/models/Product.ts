export interface Product {
    id: number;
    name: string;
    category: {
        id: number;
        description: string;
    };
    barcode: string;
    price: number;
    stock: number;
    status: boolean;
}