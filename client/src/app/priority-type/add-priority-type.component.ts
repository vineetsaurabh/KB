import { Component } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { PriorityType } from './priority-type.model';
import { PriorityTypeService } from './priority-type.service';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';
import { User } from '../user/user.model';

@Component({
    templateUrl: './add-priority-type.component.html'
})
export class AddPriorityTypeComponent extends SelectUserComponent {

    priorityType: PriorityType = new PriorityType();

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private priorityTypeService: PriorityTypeService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddPriorityTypeComponent>) {
        super(fb, userService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    setEscalatedTo(user: User) {
        this.priorityType.escalateTo = user;
    }

    createpriorityType(userForm: NgForm): void {
        this.priorityTypeService.createPriorityType(this.priorityType)
            .subscribe(data => {
                this.toastService.success(`Priorty type ${this.priorityType.priorityTypeName} added`);
                this.dialogRef.close(false);
            });
    };

}