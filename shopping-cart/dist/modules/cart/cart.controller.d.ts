import { CartService } from './cart.service';
import { ReceiptService } from '../receipt/receipt.service';
export declare class CartController {
    private readonly cartService;
    private readonly receiptService;
    constructor(cartService: CartService, receiptService: ReceiptService);
    addItem(body: {
        productId: number;
        quantity?: number;
    }): Promise<{
        success: boolean;
    }>;
    getCart(): Promise<import("../../core/entities/cart-item.entity").CartItem[]>;
    removeItem(body: {
        productId: number;
    }): Promise<{
        success: boolean;
    }>;
    updateQuantity(body: {
        productId: number;
        quantity: number;
    }): Promise<{
        success: boolean;
    }>;
    clearCart(): Promise<{
        success: boolean;
    }>;
    getCartTotals(discountPercentage: number): Promise<{
        subtotal: number;
        discount: number;
        taxes: {
            category: string;
            rate: number;
            amount: number;
        }[];
        tax: number;
        total: number;
        items: import("./cart-item.dto").CartItemDto[];
    }>;
    getReceipt(discountPercentage: number): Promise<string>;
}
