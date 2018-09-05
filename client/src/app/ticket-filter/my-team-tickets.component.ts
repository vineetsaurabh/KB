import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ListTicketComponent } from '../ticket/list-ticket.component';
import { TicketService } from '../ticket/ticket.service';
import { TokenStorage } from '../login/token.storage';
import { Ticket } from '../ticket/ticket.model';

@Component({
    selector: 'my-team-tickets',
    templateUrl: '../ticket/list-ticket.component.html'
})
export class MyTeamTicketsComponent extends ListTicketComponent {

    allColumns = ['Checkbox', 'Name', 'Type', 'Summary', 'Actions'];
    displayedColumns = this.allColumns;

    constructor(
        protected router: Router,
        protected ticketService: TicketService,
        protected toastService: ToastrService,
        protected token: TokenStorage,
        protected dialog: MatDialog) {
        super(router, ticketService, toastService, token, dialog);
    }

    ngOnInit() {
        this.getMyTeamTickets();
    };

    getMyTeamTickets() {
        this.ticketService.getMyTeamTickets()
            .subscribe(data => {
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

}