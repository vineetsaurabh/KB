import { Component, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { State } from './state.model';
import { StateService } from './state.service';

@Injectable()
@Component({
    templateUrl: './edit-state.component.html'
})
export class EditStateComponent {

    public state: State = {
        stateId: '',
        stateOrder: 0,
        stateName: '',
        description: '',
        promoteLabel: '',
        demoteLabel: '',
    };
    id: string;
    stateForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private stateService: StateService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditStateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: State) {
        this.state = this.data;
    }

    ngOnInit() {
        this.stateForm = this.fb.group({
            stateId: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        });
    }

    updateState() {
        this.stateService.updateState(this.state)
            .subscribe(res => {
                this.toastService.success(`State ${this.state.stateName} updated`);
                this.dialogRef.close(false);
            });
    }

}
