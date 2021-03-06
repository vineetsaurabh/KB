import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role } from '../role/role.model';

@Injectable()
@Component({
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

    public user: User = {
        userid: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        email: '',
        phone: '',
        address: '',
        active: false,
        checked: false,
        roles: [],
        teams: [],
    };
    id: string;
    userForm: FormGroup;

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User) {
        this.user = this.data;
    }

    ngOnInit() {
        this.userForm = this.fb.group({
            id: 0,
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]]
        })
    }

    updateUser(userForm: NgForm) {
        this.userService.updateUser(this.user)
            .subscribe(res => {
                this.toastService.success(`User ${this.user.username} updated`);
                this.dialogRef.close(false);
            });
    }

}
