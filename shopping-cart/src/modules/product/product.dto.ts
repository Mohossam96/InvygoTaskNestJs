/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @IsPositive()
  price?: number;

  @IsString()
  @IsNotEmpty()
  category?: string;
}