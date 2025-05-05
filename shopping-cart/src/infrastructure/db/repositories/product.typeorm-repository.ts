/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../core/entities/product.entity';
import { IProductRepository } from '../../../core/interfaces/IProductRepository';
import { log } from 'console';

@Injectable()
export class ProductTypeOrmRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Product | null> {
    var ID = Number.parseInt(id);
    return this.repository.findOneBy({id:ID});
  }

  async create(product: Product): Promise<Product> {
    log('create product ');
    return this.repository.save(product);
  }

  async update(id: string, updates: Partial<Product>): Promise<void> {
    await this.repository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}