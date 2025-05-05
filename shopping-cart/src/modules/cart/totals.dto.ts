/* eslint-disable prettier/prettier */
export class CartTotalsDto {
    subtotal: number;
    discount: number;
    tax: number;
    taxes: { category: string; rate: number; amount: number }[];
    total: number;
    items: {
      
      name: string;
      price: number;
      quantity: number;
      category: string;
      itemTotal:number;
    }[];
  }