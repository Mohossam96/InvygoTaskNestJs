import { Repository } from 'typeorm';
import { ICartRepository } from '../../../core/interfaces/ICartRepository';
import { CartItem } from 'src/core/entities/cart-item.entity';
export declare class CartTypeOrmRepository implements ICartRepository {
    private readonly repository;
    constructor(repository: Repository<CartItem>);
    addItem(item: CartItem): Promise<void>;
    removeItem(productId: number): Promise<void>;
    getItems(): Promise<CartItem[]>;
    clear(): Promise<void>;
    updateQuantity(productId: number, quantity: number): Promise<void>;
}
