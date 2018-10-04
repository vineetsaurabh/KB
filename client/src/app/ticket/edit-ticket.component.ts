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
import { User } from '../user/user.model';
import { State } from '../state/state.model';
import { Product } from "../product/product.model";
import { Module } from "../module/module.model";
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';
import { ProductService } from '../product/product.service';

@Injectable()
@Component({
    templateUrl: './edit-ticket.component.html'
})
export class EditTicketComponent extends SelectUserComponent {

    public ticket: Ticket = {
        ticketId: '',
        name: '',
        type: '',
        summary: '',
        description: '',
        priority: '',
        product: new Product(),
        module: new Module(),
        operation: '',
        status: new State(),
        statusLabel: '',
        assignedTo: new User(),
        assignedBy: new User(),
        assignedOn: new Date(),
        createdBy: new User(),
        creationDate: new Date(),
        lastModifiedBy: new User(),
        lastModifiedDate: new Date(),
        closedBy: new User(),
        closedOn: new Date(),
        checked: false,
        ratings: new Set<Rating>(),
    };
    id: string;
    ticketForm: FormGroup;
    ticketTypes: TicketType[];
    priorityTypes: PriorityType[];
    products: Product[];

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private ticketService: TicketService,
        private toastService: ToastrService,
        private ticketTypeService: TicketTypeService,
        private priorityTypeService: PriorityTypeService,
        private productService: ProductService,
        public dialogRef: MatDialogRef<EditTicketComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Ticket) {
        super(fb, userService);
            this.ticket = this.data;
    }

    ngOnInit() {
        super.ngOnInit();
        this.userNameForm.get('userNameGroup').setValue(this.ticket.assignedTo);
        this.ticketForm = this.fb.group({});
        this.ticketTypeService.getTicketTypes()
            .subscribe(data => {
                this.ticketTypes = data
            });
        this.priorityTypeService.getPriorityTypes()
            .subscribe(data => {
                this.priorityTypes = data
            });
        this.productService.getProducts()
            .subscribe(data => {
                this.products = data;
                this.products.forEach(p => {
                    if(p.productId === this.ticket.product.productId) {
                        this.ticket.product = p;
                        this.ticket.product.modules.forEach(m => {
                            if(m.moduleId === this.ticket.module.moduleId) {
                                this.ticket.module = m;
                            }
                        });
                    }
                });
            });
    }

    setAssignee(user: User) {
        this.ticket.assignedTo = user;
    }

    editTicket(ticketForm: NgForm) {
        this.ticketService.updateTicket(this.ticket)
            .subscribe(res => {
                this.toastService.success(`Ticket ${this.ticket.name} updated`);
                this.dialogRef.close(false);
            });
    }

}
