/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { ReceiptService } from '../receipt/receipt.service';

describe('ReceiptService', () => {
  let service: ReceiptService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ReceiptService],
    }).compile();

    service = module.get<ReceiptService>(ReceiptService);
  });

  it('should generate receipt with correct format', () => {
    const mockTotals = {
      subtotal: 1120,
      discount: 112,
      taxes: [
        { category: 'electronics', rate: 0.18, amount: 180 },
        { category: 'books', rate: 0, amount: 2 },
        { category: 'clothing', rate: 0.05, amount: 3 },
      ],
      tax: 183,
      total: 1191,
      items: [
        { quantity: 1, name: 'Laptop', price: 1000, itemTotal: 1000, category: 'electronics' },
        { quantity: 2, name: 'Book', price: 30, itemTotal: 60, category: 'books' },
        { quantity: 3, name: 'T-Shirt', price: 20, itemTotal: 60, category: 'clothing' },
      ],
    };

    const receipt = service.generateReceipt(mockTotals);

    
    expect(receipt).toContain('TOTAL: $1191.00');
  });
});