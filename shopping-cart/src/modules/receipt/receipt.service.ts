/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CartTotalsDto } from '../cart/totals.dto';

@Injectable()
export class ReceiptService {
  generateReceipt(totals: CartTotalsDto): string {
    let receipt = '=== INVOICE RECEIPT ===\n\n';
    receipt += 'ITEMS:\n';

    totals.items.forEach(item => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      receipt += `${item.quantity}x ${item.name} @ $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    receipt += `\nSUBTOTAL: $${totals.subtotal.toFixed(2)}\n`;

    receipt += `DISCOUNT (${(totals.discount / totals.subtotal * 100).toFixed(0)}%): -$${totals.discount.toFixed(2)}\n`;

    receipt += '\nTAXES:\n';
    totals.taxes.forEach(tax => {
      if (tax.amount > 0) {
        receipt += `${tax.category} (${(tax.rate * 100).toFixed(0)}%): $${tax.amount.toFixed(2)}\n`;
      }
    });

    // 5. Final Total
    receipt += '\n====================\n';
    receipt += `TOTAL: $${totals.total.toFixed(2)}\n`;
    receipt += '====================\n';
    receipt += 'Thank you for shopping with us!';

    return receipt;
  }
}