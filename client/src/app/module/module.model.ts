import { User } from '../user/user.model';
import { Product } from '../product/product.model';

export class Module {
    moduleId: string;
    moduleName: string;
    description: string;
    moduleOwner: User;
    product: Product;
    checked: boolean;
}