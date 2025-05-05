/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICartRepository } from '../../../core/interfaces/ICartRepository';
import { CartItem } from 'src/core/entities/cart-item.entity';

@Injectable()
export class CartTypeOrmRepository implements ICartRepository {
  constructor(
    @InjectRepository(CartItem)
    private readonly repository: Repository<CartItem>,
  ) {}

  async addItem(item: CartItem): Promise<void> {
    const existing = await this.repository.findOne({
      where: { product: { id: item.product.id } },
    });

    if (existing) {
      existing.quantity += item.quantity;
      await this.repository.save(existing);
    } else {
      await this.repository.save(item);
    }
  }

  async removeItem(productId: number): Promise<void> {
    await this.repository.delete({ product: { id: productId } });
  }

  async getItems(): Promise<CartItem[]> {
    return this.repository.find({ relations: ['product'] });
  }

  async clear(): Promise<void> {
    await this.repository.clear();
  }

  async updateQuantity(productId: number, quantity: number): Promise<void> {
    await this.repository.update(
      { product: { id: productId } },
      { quantity },
    );
  }
}