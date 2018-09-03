import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Product } from './product.model';
import { ProductService } from './product.service';
import { Module } from '../module/module.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';


@Injectable()
@Component({
    templateUrl: './edit-product.component.html'
})
export class EditProductComponent extends SelectUserComponent {

    public product: Product = {
        productId: '',
        productName: '',
        description: '',
        modules: new Set<Module>(),
        productOwner: new User(),
        checked: false,
    };
    id: string;
    productForm: FormGroup;

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private productService: ProductService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Product) {
        super(fb, userService);
        this.product = this.data;
    }

    ngOnInit() {
        super.ngOnInit();
        this.userNameForm.get('userNameGroup').setValue(this.product.productOwner);
        this.productForm = this.fb.group({
            productId: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    setOwner(user: User) {
        this.product.productOwner = user;
    }

    updateProduct() {
        this.productService.updateProduct(this.product)
            .subscribe(res => {
                this.toastService.success(`User ${this.product.productName} updated`);
                this.dialogRef.close(false);
            });
    }

}
