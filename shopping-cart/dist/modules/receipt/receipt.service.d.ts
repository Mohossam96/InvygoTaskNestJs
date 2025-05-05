import { CartTotalsDto } from '../cart/totals.dto';
export declare class ReceiptService {
    generateReceipt(totals: CartTotalsDto): string;
}
