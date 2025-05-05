/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../core/entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  private async seedProducts() {
    const count = await this.productRepository.count();
    if (count > 0) {
      console.log('Products already exist, skipping seeding');
      return;
    }

    const catalogPath = path.join('D:\\catalog.json');
    const products = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

    try {
      await this.productRepository.save(
        this.productRepository.create(products)
      );
      console.log(`Successfully seeded ${products.length} products`);
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  }
}