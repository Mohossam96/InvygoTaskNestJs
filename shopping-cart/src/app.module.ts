/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './core/entities/product.entity';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { CartItem } from './core/entities/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'MOHAMED-HHOSNY', 
      port: 1433, 
      username: 'mo', 
      password: '123',
      database: 'shopping_cart', 
      entities: [Product,CartItem], 
      synchronize: true, 
      options: {
        trustServerCertificate: true,
        encrypt: false, 
      },
    }),
    ProductModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
