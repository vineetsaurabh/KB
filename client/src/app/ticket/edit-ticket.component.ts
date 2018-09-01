import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';
import { Rating } from './rating.model';
import { TicketType } from '../ticket-type/ticket-type.model';
import { TicketTypeService } from '../ticket-type/ticket-type.service';
import { PriorityType } from '../priority-type/priority-type.model';
import { PriorityTypeService } from '../priority-type/priority-type.service';

@Injectable()
@Component({
    templateUrl: './edit-ticket.component.html'
})
export class EditTicketComponent implements OnInit {

    public ticket: Ticket = {
        ticketId: '',
        name: '',
        type: '',
        summary: '',
        description: '',
        priority: '',
        product: '',
        module: '',
        operation: '',
        status: '',
        assignedTo: '',
        assignedBy: '',
        assignedOn: new Date(),
        createdBy: '',
        creationDate: new Date(),
        lastModifiedBy: '',
        lastModifiedDate: new Date(),
        checked: false,
        ratings: new Set<Rating>(),
    };
    id: string;
    ticketForm: FormGroup;
    ticketTypes: TicketType[];
    priorityTypes: PriorityType[];

    constructor(
        private ticketService: TicketService,
        private fb: FormBuilder,
        private toastService: ToastrService,
        private ticketTypeService: TicketTypeService,
        private priorityTypeService: PriorityTypeService,
        public dialogRef: MatDialogRef<EditTicketComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Ticket) {
        this.ticket = this.data;
    }

    ngOnInit() {
        this.ticketForm = this.fb.group({});
        this.ticketTypeService.getTicketTypes()
            .subscribe(data => {
                this.ticketTypes = data
            });
        this.priorityTypeService.getPriorityTypes()
            .subscribe(data => {
                this.priorityTypes = data
            });
    }

    editTicket(ticketForm: NgForm) {
        this.ticketService.updateTicket(this.ticket)
            .subscribe(res => {
                this.toastService.success(`Ticket ${this.ticket.name} updated`);
                this.dialogRef.close(false);
            });
    }

}
