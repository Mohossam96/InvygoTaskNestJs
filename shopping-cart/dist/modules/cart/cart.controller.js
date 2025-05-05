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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const receipt_service_1 = require("../receipt/receipt.service");
let CartController = class CartController {
    cartService;
    receiptService;
    constructor(cartService, receiptService) {
        this.cartService = cartService;
        this.receiptService = receiptService;
    }
    async addItem(body) {
        await this.cartService.addToCart(body.productId, body.quantity || 1);
        return { success: true };
    }
    async getCart() {
        return this.cartService.getCartContents();
    }
    async removeItem(body) {
        await this.cartService.removeFromCart(body.productId);
        return { success: true };
    }
    async updateQuantity(body) {
        await this.cartService.updateQuantity(body.productId, body.quantity);
        return { success: true };
    }
    async clearCart() {
        await this.cartService.clearCart();
        return { success: true };
    }
    async getCartTotals(discountPercentage) {
        return this.cartService.calculateCartTotals(discountPercentage ? Number(discountPercentage) : 10);
    }
    async getReceipt(discountPercentage) {
        const ReceiptTotal = await this.cartService.calculateCartTotals(discountPercentage ? Number(discountPercentage) : 10);
        return this.receiptService.generateReceipt(ReceiptTotal);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Delete)('remove-product'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Post)('update-quantity'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateQuantity", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
__decorate([
    (0, common_1.Get)('totals'),
    __param(0, (0, common_1.Query)('discount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCartTotals", null);
__decorate([
    (0, common_1.Get)('receipt'),
    __param(0, (0, common_1.Query)('discount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getReceipt", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService, receipt_service_1.ReceiptService])
], CartController);
//# sourceMappingURL=cart.controller.js.map