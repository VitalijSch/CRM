export interface Order {
    id: number;
    product: string;
    quantity: number;
    amount: string;
    customer: string;
    order_date: Date | null;
    is_edit: boolean;
}
