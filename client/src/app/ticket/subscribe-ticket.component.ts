import { ListTicketComponent } from './list-ticket.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from './ticket.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TokenStorage } from '../login/token.storage';

@Component({
    selector: 'subscribed-tickets',
    templateUrl: './list-ticket.component.html'
})
export class SubscribedTicketsComponent extends ListTicketComponent {

    allColumns = ['Checkbox', 'Name', 'Type', 'Summary', 'Actions'];
    displayedColumns = this.allColumns;
    ticketids: string[];

    constructor(
        protected router: Router,
        protected ticketService: TicketService,
        protected toastService: ToastrService,
        protected token: TokenStorage,
        protected dialog: MatDialog) {
        super(router, ticketService, toastService, token, dialog);
    }

    ngOnInit() {
        this.title = "My Subscribed Tickets";
        this.getSubscribedTickets();
        this.getSubscribedTicketIds();
    };

    getSubscribedTickets() {
        const userid = this.token.getCurrentUserId();
        this.ticketService.getSubscribedTickets().subscribe(data => {
            this.tickets = data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    unSubscribeTicket(ticket) {
        this.ticketService.unSubscribeTicket(ticket.ticketId)
            .subscribe(res => {
                this.token.removeSubscribedTicketIds("" + ticket.ticketId);
                this.getSubscribedTicketIds();
                this.toastService.success(`You have unsubscribed for Ticket ${ticket.name}`);
                this.getSubscribedTickets();
            });
    }

}