/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { ReceiptService } from '../receipt/receipt.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService,    private readonly receiptService: ReceiptService,
  ) {}

  @Post('add')
  async addItem(
    @Body() body: { productId: number; quantity?: number },
  ) {
    await this.cartService.addToCart(body.productId, body.quantity || 1);
    return { success: true };
  }

  @Get()
  async getCart() {
    return this.cartService.getCartContents();
  }

  @Delete('remove-product')
  async removeItem( @Body() body: { productId: number},) {
    await this.cartService.removeFromCart(body.productId);
    return { success: true };
  }

  @Post('update-quantity')
  async updateQuantity(
    @Body() body: { productId: number; quantity: number },
  ) {
    await this.cartService.updateQuantity(body.productId, body.quantity);
    return { success: true };
  }

  @Delete()
  async clearCart() {
    await this.cartService.clearCart();
    return { success: true };
  }

  @Get('totals')
  async getCartTotals(
    @Query('discount') discountPercentage: number,
  ) {
    return this.cartService.calculateCartTotals(
      discountPercentage ? Number(discountPercentage) : 10
    );
  }
  @Get('receipt')
  async getReceipt(@Query('discount') discountPercentage: number) {
    const ReceiptTotal = await this.cartService.calculateCartTotals(
      discountPercentage ? Number(discountPercentage) : 10
    );
    return this.receiptService.generateReceipt(ReceiptTotal);
  }
}