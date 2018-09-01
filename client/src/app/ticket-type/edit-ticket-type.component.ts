import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { TicketType } from './ticket-type.model';
import { TicketTypeService } from './ticket-type.service';
import { User } from '../user/user.model';

@Injectable()
@Component({
    templateUrl: './edit-ticket-type.component.html'
})
export class EditTicketTypeComponent implements OnInit {

    public ticketType: TicketType = {
        ticketTypeid: '',
        ticketTypeName: '',
        description: '',
        defaultTicketType: false,
        checked: false,
    };
    id: string;
    ticketTypeForm: FormGroup;

    constructor(
        private ticketTypeService: TicketTypeService,
        private fb: FormBuilder,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditTicketTypeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: TicketType) {
        this.ticketType = this.data;
    }

    ngOnInit() {
        this.ticketTypeForm = this.fb.group({
            ticketTypeid: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    updateTicketType(userForm: NgForm) {
        this.ticketTypeService.updateTicketType(this.ticketType)
            .subscribe(res => {
                this.toastService.success(`Ticket type ${this.ticketType.ticketTypeName} updated`);
                this.dialogRef.close(false);
            });
    }

}
