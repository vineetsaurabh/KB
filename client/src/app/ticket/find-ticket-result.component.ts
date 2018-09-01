import { ListTicketComponent } from "./list-ticket.component";
import { Component } from "@angular/core";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { TicketService } from "./ticket.service";
import { ToastrService } from "ngx-toastr";
import { TokenStorage } from "../login/token.storage";

@Component({
    selector: 'app-comp',
    templateUrl: './list-ticket.component.html'
})
export class FindTicketResultComponent extends ListTicketComponent {

    displayedColumns = ['Checkbox', 'Name', 'Type', 'Status', 'Assigned To', 'Created By', 'Created On', 'Actions'];

    constructor(
        protected router: Router,
        protected ticketService: TicketService,
        protected toastService: ToastrService,
        protected token: TokenStorage,
        protected dialog: MatDialog,
        private route: ActivatedRoute) {
        super(router, ticketService, toastService, token, dialog);
    }

    ngOnInit() {
        this.findTickets();
    };

    findTickets() {
        this.route.queryParams.subscribe(params => {
            this.ticketService.findTickets(params.input)
                .subscribe(data => {
                    this.tickets = data;
                    this.dataSource = new MatTableDataSource(data);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                });
        });
    }
}