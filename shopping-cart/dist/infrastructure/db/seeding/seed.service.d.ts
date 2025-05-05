import { OnModuleInit } from '@nestjs/common';
import { Product } from '../../../core/entities/product.entity';
import { Repository } from 'typeorm';
export declare class SeedService implements OnModuleInit {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    onModuleInit(): Promise<void>;
    private seedProducts;
}
