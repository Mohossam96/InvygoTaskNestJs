/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../core/interfaces/IProductRepository';
import { Product } from '../../core/entities/product.entity';
import { log } from 'console';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    const product = new Product();
    Object.assign(product, productData);
    log("creating product from service");
    return this.productRepository.create(product);
  }

  async updateProduct(
    id: string,
    updates: Partial<Omit<Product, 'id'>>,
  ): Promise<void> {
    await this.productRepository.update(id, updates);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}