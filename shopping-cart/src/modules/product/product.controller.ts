/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../core/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Console, log } from 'console';
import{IProductRepository} from '../../core/interfaces/IProductRepository'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() productData: CreateProductDto) {
    log('s');
    return this.productService.createProduct(productData);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updates: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updates);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
