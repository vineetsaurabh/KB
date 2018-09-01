import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ListTicketComponent } from '../ticket/list-ticket.component';
import { TicketService } from '../ticket/ticket.service';
import { TokenStorage } from '../login/token.storage';
import { Ticket } from '../ticket/ticket.model';

@Component({
    selector: 'recent-tickets',
    templateUrl: '../ticket/list-ticket.component.html'
})
export class RecentTicketsComponent extends ListTicketComponent {

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
        this.getMyTickets();
    };

    getMyTickets() {
        const user = this.token.getCurrentUser();
        this.ticketService.getAllTickets()
            .subscribe(data => {
                //data = data.filter(t => this.isFiveDaysOld(t));
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    daysBetween(date) {
        let one_day = 1000 * 60 * 60 * 24;
        let date_ms = date.getTime();
        let diff_ms = (new Date()).getTime(); - date_ms;

        return Math.round(diff_ms / one_day);
    }

    isFiveDaysOld(t) {
        let day = this.daysBetween(t.creationDate);
        if(day < 5) {
            return true;
        }
        return false;
    }

}