import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { saveAs } from 'file-saver/FileSaver';

import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';
import { ListComponent } from '../common/list.component';
import { CreateTicketComponent } from './create-ticket.component';
import { EditTicketComponent } from './edit-ticket.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { TokenStorage } from '../login/token.storage';
import { AssignTicketComponent } from './assign-ticket.component';

@Component({
    selector: 'all-tickets',
    templateUrl: './list-ticket.component.html'
})
export class ListTicketComponent extends ListComponent implements OnInit {

    title: string = "All Tickets";
    tickets: Ticket[];
    subscribedTicketIds: string[];
    allColumns = ['Checkbox', 'Name', 'Type', 'Summary', 'Description', 'Priority', 'Product',
        'Module', 'Operation', 'Status', 'Assigned To', 'Assigned By', 'Assigned On',
        'Created By', 'Created On', 'Last Modified By', 'Last Modified On', 'Actions'];
    displayedColumns = ['Checkbox', 'Name', 'Type', 'Priority', 'Status', 'Assigned To',
        'Created By', 'Created On', 'Actions'];
    dataSource: MatTableDataSource<Ticket>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        protected router: Router,
        protected ticketService: TicketService,
        protected toastService: ToastrService,
        protected token: TokenStorage,
        protected dialog: MatDialog) {
        super(dialog);
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getTickets();
            this.getSubscribedTicketIds();
        });
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }


    get selectedTicketIds() {
        return this.tickets
            .filter(ticket => ticket.checked)
            .map(ticket => ticket.ticketId);
    }

    get selectedTickets() {
        return this.tickets
            .filter(ticket => ticket.checked);
    }

    createTicket(): Observable<boolean> {
        let dialogRef: MatDialogRef<CreateTicketComponent>;
        dialogRef = this.dialog.open(CreateTicketComponent, {
            width: '1000px',
            height: '580px',
            disableClose: true,
        });
        return dialogRef.afterClosed();
    }

    getTickets() {
        this.ticketService.getAllTickets()
            .subscribe(data => {
                this.tickets = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    editTicket(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditTicketComponent>;
        dialogRef = this.dialog.open(EditTicketComponent, {
            data: id,
            width: '1000px',
            height: '600px',
        });
        return dialogRef.afterClosed();
    }

    onDeleteTicket(ticket: Ticket) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete ticket ${ticket.name}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteTicket(ticket);
            }
        });
    }

    deleteTicket(ticket: Ticket): void {
        this.ticketService.deleteTicket(ticket)
            .subscribe(data => {
                this.tickets = this.tickets.filter(t => t !== ticket);
                this.toastService.success(`Ticket ${ticket.name} deleted`);
                this.getTickets();
            });
    };

    onDeleteSelectedTickets() {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        if (this.selectedTicketIds.length == 1) {
            dialogRef = this.dialog.open(ConfirmDeleteComponent, {
                data: `Are you sure want to delete the selected ticket?`
            });
        } else {
            dialogRef = this.dialog.open(ConfirmDeleteComponent, {
                data: `Are you sure want to delete ${this.selectedTicketIds.length} tickets?`
            });
        }
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteSelectedTickets();
            }
        });
    }

    deleteSelectedTickets() {
        let selectedTicketsLength = this.selectedTicketIds.length;
        this.ticketService.deleteTickets(this.selectedTicketIds)
            .subscribe(res => {
                this.getTickets();
                if (selectedTicketsLength == 1) {
                    this.toastService.success(`1 ticket deleted`);
                } else {
                    this.toastService.success(`${selectedTicketsLength} tickets deleted`);
                }
            });
    }

    toggleSelection($event) {
        if ($event.checked) {
            this.tickets.forEach(ticket => ticket.checked = true);
        } else {
            this.tickets.forEach(ticket => ticket.checked = false);
        }
    }

    getSubscribedTicketIds() {
        let subscribedTickets = this.token.getSubscribedTicketIds();
        if (subscribedTickets) {
            this.subscribedTicketIds = subscribedTickets.split(',');
        } else {
            this.subscribedTicketIds = null;
        }
    }

    subscribeTicket(ticket) {
        this.ticketService.subscribeTicket(ticket.ticketId)
            .subscribe(res => {
                this.token.addSubscribedTicketIds(ticket.ticketId);
                this.getSubscribedTicketIds();
                this.toastService.success(`You have subscribed for Ticket ${ticket.name}`);
            });
    }

    unSubscribeTicket(ticket) {
        this.ticketService.unSubscribeTicket(ticket.ticketId)
            .subscribe(res => {
                this.token.removeSubscribedTicketIds("" + ticket.ticketId);
                this.getSubscribedTicketIds();
                this.toastService.success(`You have unsubscribed for Ticket ${ticket.name}`);
            });
    }

    subscribeTickets() {
        let selectedTicketsLength = this.selectedTickets.length;
        let ticketIds = this.selectedTicketIds.join(",");
        this.ticketService.subscribeTickets(ticketIds)
            .subscribe(res => {
                this.token.addSubscribedTicketIds(ticketIds);
                this.getSubscribedTicketIds();
                if (res == 0) {
                    this.toastService.warning(`All selected tickets are already subscribed`);
                } else if (res == 1) {
                    this.toastService.success(`1 ticket subscribed`);
                } else {
                    this.toastService.success(`${res} tickets subscribed`);
                }
            });
    }

    unSubscribeTickets() {
        let selectedTicketsLength = this.selectedTickets.length;
        let ticketIds = this.selectedTicketIds.join(",");
        this.ticketService.unSubscribeTickets(ticketIds)
            .subscribe(res => {
                this.token.removeSubscribedTicketIds(ticketIds);
                this.getSubscribedTicketIds();
                if (res == 0) {
                    this.toastService.warning(`All selected tickets are not subscribed`);
                } else if (res == 1) {
                    this.toastService.success(`1 ticket un-subscribed`);
                } else {
                    this.toastService.success(`${res} tickets un-subscribed`);
                }
            });
    }

    download(file) {
        this.ticketService.downloadFile(file.ticketDocId)
            .subscribe(res => {
                saveAs(res.body, file.filename);
            });
    }

    assignTickets(): Observable<boolean> {
        let dialogRef: MatDialogRef<AssignTicketComponent>;
        dialogRef = this.dialog.open(AssignTicketComponent, {
            data: this.selectedTickets,
            width: '800px',
            height: '600px',
        });
        return dialogRef.afterClosed();
    }

    disableAction() {
        if (this.tickets) {
            return !this.tickets.some(_ => _.checked);
        }
        return true;
    }

    truncateHTML(text: string): string {
        let charlimit = 60;
        if (!text || text.length <= charlimit) {
            return text;
        }
        let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
        let shortened = without_html.substring(0, charlimit) + "...";
        return shortened;
    }

}
