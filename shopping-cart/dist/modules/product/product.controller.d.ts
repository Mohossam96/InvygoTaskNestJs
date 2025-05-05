import { ProductService } from './product.service';
import { Product } from '../../core/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product | null>;
    createProduct(productData: CreateProductDto): Promise<Product>;
    updateProduct(id: string, updates: UpdateProductDto): Promise<void>;
    deleteProduct(id: string): Promise<void>;
}
