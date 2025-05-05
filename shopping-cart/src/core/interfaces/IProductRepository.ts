/* eslint-disable prettier/prettier */
import { Product } from '../entities/product.entity';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<void>;
  delete(id: string): Promise<void>;
}