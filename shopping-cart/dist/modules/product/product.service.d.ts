import { IProductRepository } from '../../core/interfaces/IProductRepository';
import { Product } from '../../core/entities/product.entity';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(productData: Omit<Product, 'id'>): Promise<Product>;
    updateProduct(id: string, updates: Partial<Omit<Product, 'id'>>): Promise<void>;
    deleteProduct(id: string): Promise<void>;
}
