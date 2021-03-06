import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ListTicketComponent } from '../ticket/list-ticket.component';
import { TicketService } from '../ticket/ticket.service';
import { TokenStorage } from '../login/token.storage';
import { PriorityType } from '../priority-type/priority-type.model';
import { PriorityTypeService } from '../priority-type/priority-type.service';

@Component({
    selector: 'priority-tickets',
    //templateUrl: '../ticket-filter/priority-tickets.component.html'
    templateUrl: '../ticket/list-ticket.component.html'
})
export class PriorityTicketsComponent extends ListTicketComponent {

    allColumns = ['Checkbox', 'Name', 'Type', 'Summary', 'Actions'];
    displayedColumns = this.allColumns;

    constructor(
        protected router: Router,
        protected ticketService: TicketService,
        private priorityTypeService: PriorityTypeService,
        protected toastService: ToastrService,
        protected token: TokenStorage,
        protected dialog: MatDialog) {
        super(router, ticketService, toastService, token, dialog);
    }

    ngOnInit() {
        this.priorityTypeService.getPriorityTypes()
            .subscribe(data => {
                /* this.priorityTypes.forEach(priorityType => 
                    this.getTicketsByPriority(priorityType.priorityTypeName)
                ); */
                this.getTicketsByPriority(data[0].priorityTypeName);
            });
    };

    getTicketsByPriority(priorityTypeName) {
        this.ticketService.findByPriority(priorityTypeName)
            .subscribe(data => {
                this.tickets = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
    }

}