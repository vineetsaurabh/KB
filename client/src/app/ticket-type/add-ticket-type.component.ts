import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { TicketType } from './ticket-type.model';
import { TicketTypeService } from './ticket-type.service';

@Component({
    templateUrl: './add-ticket-type.component.html'
})
export class AddTicketTypeComponent {

    ticketType: TicketType = new TicketType();

    constructor(
        private router: Router,
        private ticketTypeService: TicketTypeService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddTicketTypeComponent>) {

    }

    createTicketType(userForm: NgForm): void {
        this.ticketTypeService.createTicketType(this.ticketType)
            .subscribe(data => {
                this.toastService.success(`Ticket type ${this.ticketType.ticketTypeName} added`);
                this.dialogRef.close(false);
            });
    };

}