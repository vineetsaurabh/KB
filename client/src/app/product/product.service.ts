import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Product } from "./product.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    private productUrl = environment.baseUrl + '/product';

    public createProduct(product: Product) {
        return this.http.post<Product>(this.productUrl, product, httpOptions);
    }

    public getProducts() {
        return this.http.get<Product[]>(this.productUrl);
    }

    public getProduct(productId: number) {
        return this.http.get<Product>(this.productUrl + "/" + productId);
    }

    public updateProduct(product: Product) {
        return this.http.put<Product>(this.productUrl + "/" + product.productId, product, httpOptions);
    }

    public deleteProduct(product: Product) {
        return this.http.delete(this.productUrl + "/" + product.productId);
    }

}