import { Injectable } from '@nestjs/common';
import { CartItem } from '../core/entities/cart-item.entity';

@Injectable()
export class TaxService {
  private readonly taxRates: Record<string, number> = {
    books: 0,
    electronics: 0.18,
    clothing: 0.05,
  };

  calculateTax(items: CartItem[]): { category: string; amount: number }[] {
    const taxes: Record<string, number> = {};

    items.forEach(item => {
      const category = item.product.category.toLowerCase();
      const rate = this.taxRates[category] || 0;
      const taxAmount = item.product.price * item.quantity * rate;
      taxes[category] = (taxes[category] || 0) + taxAmount;
    });

    return Object.entries(taxes).map(([category, amount]) => ({
      category,
      amount
    }));
  }
}