/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from 'src/core/entities/product.entity';
import { CartService } from './cart.service';
import { CartItem } from 'src/core/entities/cart-item.entity';

describe('CartService', () => {
    let service: CartService;
    
    const mockCartRepository = {
      getItems: jest.fn().mockResolvedValue([]),
      addItem: jest.fn(),
      removeItem: jest.fn(),
    };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: 'ICartRepository', 
          useValue: mockCartRepository,
        },
        
        
        {
          provide: getRepositoryToken(CartItem),
          useValue: {}, 
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  describe('calculateCartTotals', () => {
    it('should calculate totals correctly with mixed items', async () => {
      mockCartRepository.getItems.mockResolvedValue([
        {
          quantity: 1,
          product: { id: 1, name: 'Laptop', price: 1000, category: 'electronics' },
        },
        {
          quantity: 2,
          product: { id: 2, name: 'Book', price: 30, category: 'books' },
        },
        {
          quantity: 3,
          product: { id: 3, name: 'T-Shirt', price: 20, category: 'clothing' },
        },
      ]);

      const result = await service.calculateCartTotals();

      expect(result.subtotal).toBe(1120);
      expect(result.discount).toBe(112); 
      expect(result.tax).toBeCloseTo(183); 
      expect(result.total).toBeCloseTo(1191); 
      expect(result.taxes).toEqual([
        { category: 'electronics', rate: 0.18, amount: 180 },
        { category: 'books', rate: 0, amount: 0 },
        { category: 'clothing', rate: 0.05, amount: 3 },
      ]);
    });
  });
});