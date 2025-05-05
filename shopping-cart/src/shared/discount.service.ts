import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscountService {
  calculateDiscount(amount: number, percentage: number): number {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Invalid discount percentage');
    }
    return amount * (percentage / 100);
  }
}