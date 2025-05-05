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
exports.CartTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_item_entity_1 = require("../../../core/entities/cart-item.entity");
let CartTypeOrmRepository = class CartTypeOrmRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async addItem(item) {
        const existing = await this.repository.findOne({
            where: { product: { id: item.product.id } },
        });
        if (existing) {
            existing.quantity += item.quantity;
            await this.repository.save(existing);
        }
        else {
            await this.repository.save(item);
        }
    }
    async removeItem(productId) {
        await this.repository.delete({ product: { id: productId } });
    }
    async getItems() {
        return this.repository.find({ relations: ['product'] });
    }
    async clear() {
        await this.repository.clear();
    }
    async updateQuantity(productId, quantity) {
        await this.repository.update({ product: { id: productId } }, { quantity });
    }
};
exports.CartTypeOrmRepository = CartTypeOrmRepository;
exports.CartTypeOrmRepository = CartTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CartTypeOrmRepository);
//# sourceMappingURL=cart.typeorm-repository.js.map