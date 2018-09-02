import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { PriorityType } from './priority-type.model';
import { PriorityTypeService } from './priority-type.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';

@Injectable()
@Component({
    templateUrl: './edit-priority-type.component.html'
})
export class EditPriorityTypeComponent extends SelectUserComponent {

    public priorityType: PriorityType = {
        priorityTypeid: '',
        priorityTypeName: '',
        description: '',
        defaultPriorityType: false,
        sla: '',
        escalateTo: new User(),
        timeToResolve: 0,
        checked: false,
    };
    id: string;
    priorityTypeForm: FormGroup;
    defaultPriority: boolean;

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private priorityTypeService: PriorityTypeService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditPriorityTypeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PriorityType) {
            super(fb, userService);
        this.priorityType = this.data;
        this.defaultPriority = this.data.defaultPriorityType;
    }

    ngOnInit() {
        super.ngOnInit();
        this.userNameForm.get('userNameGroup').setValue(this.priorityType.escalateTo);
        this.priorityTypeForm = this.fb.group({
            priorityTypeid: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    setEscalatedTo(user: User) {
        this.priorityType.escalateTo = user;
    }

    updatePriorityType(userForm: NgForm) {
        this.priorityTypeService.updatePriorityType(this.priorityType)
            .subscribe(res => {
                this.toastService.success(`Priority type ${this.priorityType.priorityTypeName} updated`);
                this.dialogRef.close(false);
            });
    }

}
