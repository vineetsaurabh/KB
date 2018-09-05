import { User } from '../user/user.model';
import { Module } from '../module/module.model';

export class Product {
    productId: string;
    productName: string;
    description: string;
    modules: Set<Module>;
    productOwner: User;
    defaultProduct: boolean;
    checked: boolean;
}