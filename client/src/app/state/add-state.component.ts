import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { State } from './state.model';
import { StateService } from './state.service';

@Component({
    templateUrl: './add-state.component.html'
})
export class AddStateComponent {

    state: State = new State();

    constructor(
        private fb: FormBuilder,
        private stateService: StateService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddStateComponent>) {
    }

    createState(): void {
        this.stateService.createState(this.state)
            .subscribe(data => {
                this.toastService.success(`User ${this.state.stateName} added`);
                this.dialogRef.close(false);
            });
    }

}