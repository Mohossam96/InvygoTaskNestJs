/* eslint-disable prettier/prettier */
// src/modules/product/product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../core/entities/product.entity';
import { ProductTypeOrmRepository } from '../../infrastructure/db/repositories/product.typeorm-repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SeedService } from 'src/infrastructure/db/seeding/seed.service';


@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    {
      provide: 'IProductRepository', 
      useClass: ProductTypeOrmRepository,
      
    },
    
    ProductService,
  
    SeedService
  ],
  controllers: [ProductController], 
  exports: ['IProductRepository',ProductService], 
})
export class ProductModule {}