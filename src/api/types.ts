export type UUID = string;

export type CreateAccountRequest = { userId: UUID };
export type CreateAccountResponse = { created: boolean };

export type TopUpRequest = { userId: UUID; amount: number };
export type BalanceResponse = { balance: number } | { userId: UUID; balance: number };

export type CreateOrderRequest = { userId: UUID; amount: number; description: string };
export type CreateOrderResponse = { orderId: UUID; status: string };

export type Order = {
    id: UUID;
    userId: UUID;
    amount: number;
    description: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
};
