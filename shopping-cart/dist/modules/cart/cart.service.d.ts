import { ICartRepository } from '../../core/interfaces/ICartRepository';
import { ProductService } from '../product/product.service';
import { CartItem } from 'src/core/entities/cart-item.entity';
import { CartItemDto } from './cart-item.dto';
export declare class CartService {
    private readonly cartRepository;
    private readonly productService;
    private readonly TAX_RATES;
    constructor(cartRepository: ICartRepository, productService: ProductService);
    addToCart(productId: number, quantity?: number): Promise<void>;
    getCartContents(): Promise<CartItem[]>;
    removeFromCart(productId: number): Promise<void>;
    updateQuantity(productId: number, quantity: number): Promise<void>;
    clearCart(): Promise<void>;
    calculateCartTotals(discountPercentage?: number): Promise<{
        subtotal: number;
        discount: number;
        taxes: {
            category: string;
            rate: number;
            amount: number;
        }[];
        tax: number;
        total: number;
        items: CartItemDto[];
    }>;
    private calculateDiscount;
    private calculateTaxes;
    private roundToTwo;
    private mapToCartItemDto;
}
