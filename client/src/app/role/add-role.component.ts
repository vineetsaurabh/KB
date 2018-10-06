import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Role } from './role.model';
import { RoleService } from './role.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
    templateUrl: './add-role.component.html'
})
export class AddRoleComponent {

    role: Role = new Role();

    constructor(
        private router: Router,
        private roleService: RoleService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddRoleComponent>) {

    }

    createRole(userForm: NgForm): void {
        this.roleService.createRole(this.role)
            .subscribe(data => {
                this.toastService.success(`Role ${this.role.roleName} added`);
                this.dialogRef.close(false);
            });
    };

}