/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

@Entity()
export class Product {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
  })
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column('float', { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  category: string;
}
