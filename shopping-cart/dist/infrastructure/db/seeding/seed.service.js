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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../../../core/entities/product.entity");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const path = require("path");
let SeedService = class SeedService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async onModuleInit() {
        await this.seedProducts();
    }
    async seedProducts() {
        const count = await this.productRepository.count();
        if (count > 0) {
            console.log('Products already exist, skipping seeding');
            return;
        }
        const catalogPath = path.join('D:\\catalog.json');
        const products = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
        try {
            await this.productRepository.save(this.productRepository.create(products));
            console.log(`Successfully seeded ${products.length} products`);
        }
        catch (error) {
            console.error('Error seeding products:', error);
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map