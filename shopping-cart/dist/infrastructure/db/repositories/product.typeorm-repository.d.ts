import { Repository } from 'typeorm';
import { Product } from '../../../core/entities/product.entity';
import { IProductRepository } from '../../../core/interfaces/IProductRepository';
export declare class ProductTypeOrmRepository implements IProductRepository {
    private readonly repository;
    constructor(repository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    create(product: Product): Promise<Product>;
    update(id: string, updates: Partial<Product>): Promise<void>;
    delete(id: string): Promise<void>;
}
