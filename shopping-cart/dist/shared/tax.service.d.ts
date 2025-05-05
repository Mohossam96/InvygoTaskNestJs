import { CartItem } from '../core/entities/cart-item.entity';
export declare class TaxService {
    private readonly taxRates;
    calculateTax(items: CartItem[]): {
        category: string;
        amount: number;
    }[];
}
