import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Product } from './product.model';
import { ProductService } from './product.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';

@Component({
    templateUrl: './add-product.component.html'
})
export class AddProductComponent extends SelectUserComponent {

    product: Product = new Product();

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private productService: ProductService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddProductComponent>) {
        super(fb, userService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    setOwner(user: User) {
        this.product.productOwner = user;
    }

    createProduct(): void {
        this.productService.createProduct(this.product)
            .subscribe(data => {
                this.toastService.success(`User ${this.product.productName} added`);
                this.dialogRef.close(false);
            });
    };

}