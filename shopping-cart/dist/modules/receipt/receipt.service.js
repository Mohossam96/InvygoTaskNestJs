"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptService = void 0;
const common_1 = require("@nestjs/common");
let ReceiptService = class ReceiptService {
    generateReceipt(totals) {
        let receipt = '=== INVOICE RECEIPT ===\n\n';
        receipt += 'ITEMS:\n';
        totals.items.forEach(item => {
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
        receipt += '\n====================\n';
        receipt += `TOTAL: $${totals.total.toFixed(2)}\n`;
        receipt += '====================\n';
        receipt += 'Thank you for shopping with us!';
        return receipt;
    }
};
exports.ReceiptService = ReceiptService;
exports.ReceiptService = ReceiptService = __decorate([
    (0, common_1.Injectable)()
], ReceiptService);
//# sourceMappingURL=receipt.service.js.map