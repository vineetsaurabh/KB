import { Inject, Injectable, Component, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { User } from "../user/user.model";
import { TicketService } from "./ticket.service";
import { UserService } from "../user/user.service";
import { Ticket } from "./ticket.model";

@Injectable()
@Component({
    templateUrl: './assign-ticket.component.html'
})
export class AssignTicketComponent {

    users: User[];
    tickets: Ticket[];
    selectedUser: User;

    allColumns = ['Radio', 'Name'];
    displayedColumns = ['Radio', 'Name'];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private ticketService: TicketService,
        private userService: UserService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AssignTicketComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Ticket[]) {
        this.tickets = this.data;
    }

    ngOnInit() {
        this.getUsers();
        if (this.tickets.length == 1) {
            this.selectedUser = this.tickets[0].assignedTo;
        }
    }

    getUsers() {
        this.userService.getUsers()
            .subscribe(data => {
                this.users = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    assignTickets() {
        this.tickets.forEach(ticket => ticket.assignedTo = this.selectedUser);
        this.ticketService.assignTickets(this.tickets)
            .subscribe(res => {
                this.toastService.success(`Ticket assigned`);
                this.dialogRef.close(false);
            });
    }

}