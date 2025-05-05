/* eslint-disable prettier/prettier */
import { CartItem } from '../entities/cart-item.entity';

export interface ICartRepository {
  addItem(item: CartItem): Promise<void>;
  removeItem(productId: number): Promise<void>;
  getItems(): Promise<CartItem[]>;
  clear(): Promise<void>;
  updateQuantity(productId: number, quantity: number): Promise<void>;
}
