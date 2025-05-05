"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxService = void 0;
const common_1 = require("@nestjs/common");
let TaxService = class TaxService {
    taxRates = {
        books: 0,
        electronics: 0.18,
        clothing: 0.05,
    };
    calculateTax(items) {
        const taxes = {};
        items.forEach(item => {
            const category = item.product.category.toLowerCase();
            const rate = this.taxRates[category] || 0;
            const taxAmount = item.product.price * item.quantity * rate;
            taxes[category] = (taxes[category] || 0) + taxAmount;
        });
        return Object.entries(taxes).map(([category, amount]) => ({
            category,
            amount
        }));
    }
};
exports.TaxService = TaxService;
exports.TaxService = TaxService = __decorate([
    (0, common_1.Injectable)()
], TaxService);
//# sourceMappingURL=tax.service.js.map