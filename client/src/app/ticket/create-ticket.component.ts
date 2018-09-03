import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';
import { TicketTypeService } from '../ticket-type/ticket-type.service';
import { TicketType } from '../ticket-type/ticket-type.model';
import { PriorityTypeService } from '../priority-type/priority-type.service';
import { PriorityType } from '../priority-type/priority-type.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';
import { Module } from '../module/module.model';

@Component({
    templateUrl: './create-ticket.component.html'
})
export class CreateTicketComponent extends SelectUserComponent {

    ticket: Ticket = new Ticket();
    ticketTypes: TicketType[];
    products: Product[];
    modules: Module[];
    priorityTypes: PriorityType[];

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private ticketService: TicketService,
        private productService: ProductService,
        private toastService: ToastrService,
        private ticketTypeService: TicketTypeService,
        private priorityTypeService: PriorityTypeService,
        public dialogRef: MatDialogRef<CreateTicketComponent>) {
        super(fb, userService);
    }

    ngOnInit() {
        this.ticketTypeService.getTicketTypes()
            .subscribe(data => {
                this.ticketTypes = data;
                this.ticket.type = data.filter(_ => _.defaultTicketType)[0].ticketTypeName;
            });
        this.priorityTypeService.getPriorityTypes()
            .subscribe(data => {
                this.priorityTypes = data;
                this.ticket.priority = data.filter(_ => _.defaultPriorityType)[0].priorityTypeName;
            });
        this.productService.getProducts()
            .subscribe(data => {
                this.products = data;
            });
        super.ngOnInit();
    }

    setAssignee(user: User) {
        this.ticket.assignedTo = user;
    }

    createTicket(): void {
        this.ticketService.createTicket(this.ticket)
            .subscribe(data => {
                this.toastService.success(`Ticket ${data.name} added`);
                this.dialogRef.close(false);
            });
    };

}
