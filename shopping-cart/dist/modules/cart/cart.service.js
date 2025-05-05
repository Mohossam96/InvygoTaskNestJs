"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../product/product.service");
const cart_item_entity_1 = require("../../core/entities/cart-item.entity");
let CartService = class CartService {
    cartRepository;
    productService;
    TAX_RATES = {
        books: 0,
        electronics: 0.18,
        clothing: 0.05,
    };
    constructor(cartRepository, productService) {
        this.cartRepository = cartRepository;
        this.productService = productService;
    }
    async addToCart(productId, quantity = 1) {
        const product = await this.productService.getProductById(String(productId));
        if (!product)
            throw new Error('Product not found');
        const item = new cart_item_entity_1.CartItem();
        item.product = product;
        item.quantity = quantity;
        await this.cartRepository.addItem(item);
    }
    async getCartContents() {
        return this.cartRepository.getItems();
    }
    async removeFromCart(productId) {
        await this.cartRepository.removeItem(productId);
    }
    async updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            await this.removeFromCart(productId);
        }
        else {
            await this.cartRepository.updateQuantity(productId, quantity);
        }
    }
    async clearCart() {
        await this.cartRepository.clear();
    }
    async calculateCartTotals(discountPercentage = 10) {
        const items = await this.cartRepository.getItems();
        const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const discount = this.calculateDiscount(subtotal, discountPercentage);
        const { taxes, totalTax } = this.calculateTaxes(items);
        const total = subtotal - discount + totalTax;
        return {
            subtotal: this.roundToTwo(subtotal),
            discount: this.roundToTwo(discount),
            taxes,
            tax: this.roundToTwo(totalTax),
            total: this.roundToTwo(total),
            items: items.map(this.mapToCartItemDto),
        };
    }
    calculateDiscount(subtotal, percentage) {
        if (percentage < 0 || percentage > 100) {
            throw new Error('Discount percentage must be between 0 and 100');
        }
        return this.roundToTwo(subtotal * (percentage / 100));
    }
    calculateTaxes(items) {
        const taxesByCategory = {};
        items.forEach(item => {
            const category = item.product.category.toLowerCase();
            const rate = this.TAX_RATES[category] || 0;
            const taxAmount = item.product.price * item.quantity * rate;
            taxesByCategory[category] = (taxesByCategory[category] || 0) + taxAmount;
        });
        const taxes = Object.entries(taxesByCategory).map(([category, amount]) => ({
            category,
            rate: this.TAX_RATES[category],
            amount: this.roundToTwo(amount),
        }));
        const totalTax = taxes.reduce((sum, tax) => sum + tax.amount, 0);
        return { taxes, totalTax };
    }
    roundToTwo(value) {
        return Math.round(value * 100) / 100;
    }
    mapToCartItemDto(item) {
        return {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            category: item.product.category,
            itemTotal: (item.product.price * item.quantity),
        };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICartRepository')),
    __metadata("design:paramtypes", [Object, product_service_1.ProductService])
], CartService);
//# sourceMappingURL=cart.service.js.map