
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { Product } from './product.model';
import { ProductService } from './product.service';
import { AddProductComponent } from './add-product.component';
import { EditProductComponent } from './edit-product.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { ListComponent } from '../common/list.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-product.component.html'
})
export class ListProductComponent extends ListComponent {

    products: Product[];
    allColumns = ['Checkbox', 'Name', 'Description', 'Default', 'Owner', 'Modules', 'Actions'];
    displayedColumns = ['Checkbox', 'Name', 'Description', 'Default', 'Owner', 'Modules', 'Actions'];
    dataSource: MatTableDataSource<Product>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private productService: ProductService,
        private toastService: ToastrService,
        protected dialog: MatDialog) {
            super(dialog);
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getProducts();
        });
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    getProducts() {
        this.productService.getProducts()
            .subscribe(data => {
                this.products = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    public addProduct(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddProductComponent>;
        dialogRef = this.dialog.open(AddProductComponent, {
            width: '600px',
            height: '380px',
        });
        return dialogRef.afterClosed();
    }

    public editProduct(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditProductComponent>;
        dialogRef = this.dialog.open(EditProductComponent, {
            data: id,
            width: '400px',
        });
        return dialogRef.afterClosed();
    }

    onDeleteProduct(product: Product) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete product ${product.productName}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteProduct(product);
            }
        });
    }

    deleteProduct(product: Product): void {
        this.productService.deleteProduct(product)
            .subscribe(data => {
                this.products = this.products.filter(u => u !== product);
                this.toastService.success(`Product ${product.productName} deleted`);
                this.getProducts();
            });
    };

    toggleSelection($event) {
        if($event.checked) {
            this.products.forEach(product => product.checked = true);
        } else {
            this.products.forEach(product => product.checked = false);
        }
    }

}
