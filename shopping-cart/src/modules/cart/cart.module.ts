/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from '../product/product.module';
import { CartService } from './cart.service';

import { CartTypeOrmRepository } from '../../infrastructure/db/repositories/cart.typeorm-repository';
import { CartItem } from 'src/core/entities/cart-item.entity';
import { CartController } from './cart.controller';
import { ReceiptService } from '../receipt/receipt.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem]),
    ProductModule, 
  ],
  controllers: [CartController],
  providers: [
    {
      provide: 'ICartRepository',
      useClass: CartTypeOrmRepository,
    },
    CartService,
    ReceiptService,
  ],
  exports: ['ICartRepository',CartService],
})
export class CartModule {}