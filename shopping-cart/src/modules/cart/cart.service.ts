/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ICartRepository } from '../../core/interfaces/ICartRepository';
import { ProductService } from '../product/product.service';
import { CartItem } from 'src/core/entities/cart-item.entity';
import { CartItemDto } from './cart-item.dto';


@Injectable()

export class CartService {
    private readonly TAX_RATES = {
        books: 0,
        electronics: 0.18,
        clothing: 0.05,
      };
  constructor(
    @Inject('ICartRepository')

    
    private readonly cartRepository: ICartRepository,
    private readonly productService: ProductService,
  ) {}

  async addToCart(productId: number, quantity: number = 1): Promise<void> {
    const product = await this.productService.getProductById(String(productId));
    if (!product) throw new Error('Product not found');

    const item = new CartItem();
    item.product = product;
    item.quantity = quantity;

    await this.cartRepository.addItem(item);
  }

  async getCartContents(): Promise<CartItem[]> {
    return this.cartRepository.getItems();
  }

  async removeFromCart(productId: number): Promise<void> {
    await this.cartRepository.removeItem(productId);
  }

  async updateQuantity(productId: number, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await this.removeFromCart(productId);
    } else {
      await this.cartRepository.updateQuantity(productId, quantity);
    }
  }

  async clearCart(): Promise<void> {
    await this.cartRepository.clear();
  }
  async calculateCartTotals(discountPercentage: number = 10): Promise<{
    subtotal: number;
    discount: number;
    taxes: { category: string; rate: number; amount: number }[];
    tax: number;
    total: number;
    items: CartItemDto[];
    
  }> {
    const items = await this.cartRepository.getItems();
   
    const subtotal = items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0,
    );

    const discount = this.calculateDiscount(subtotal, discountPercentage);

    const { taxes, totalTax } = this.calculateTaxes(items);

    const total = subtotal - discount + totalTax;
    
    return  {
      subtotal: this.roundToTwo(subtotal),
      discount: this.roundToTwo(discount),
      taxes,
      tax: this.roundToTwo(totalTax),
      total: this.roundToTwo(total),
      
      
      // eslint-disable-next-line @typescript-eslint/unbound-method
      items: items.map(this.mapToCartItemDto),
    };
  }

  private calculateDiscount(subtotal: number, percentage: number): number {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Discount percentage must be between 0 and 100');
    }
    return this.roundToTwo(subtotal * (percentage / 100));
  }

  private calculateTaxes(items: CartItem[]): {
    taxes: { category: string; rate: number; amount: number }[];
    totalTax: number;
  } {
    const taxesByCategory: Record<string, number> = {};

    items.forEach(item => {
      const category = item.product.category.toLowerCase();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const rate = this.TAX_RATES[category] || 0;
      const taxAmount = item.product.price * item.quantity * rate;

      taxesByCategory[category] = (taxesByCategory[category] || 0) + taxAmount;
    });

    const taxes = Object.entries(taxesByCategory).map(([category, amount]) => ({
      category,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      rate: this.TAX_RATES[category],
      amount: this.roundToTwo(amount),
    }));

    const totalTax = taxes.reduce((sum, tax) => sum + tax.amount, 0);

    return { taxes, totalTax };
  }

  private roundToTwo(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private mapToCartItemDto(item: CartItem): CartItemDto {
    return {
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      category: item.product.category,
      itemTotal: (item.product.price * item.quantity),
    };
  }
}