
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { TicketType } from './ticket-type.model';
import { TicketTypeService } from './ticket-type.service';
import { AddTicketTypeComponent } from './add-ticket-type.component';
import { EditTicketTypeComponent } from './edit-ticket-type.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { ListComponent } from '../common/list.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-ticket-type.component.html'
})
export class ListTicketTypeComponent extends ListComponent implements OnInit {

    ticketTypes: TicketType[];
    allColumns = ['Checkbox', 'Name', 'Description', 'Default', 'Actions'];
    displayedColumns = ['Checkbox', 'Name', 'Description', 'Default', 'Actions'];
    dataSource: MatTableDataSource<TicketType>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private ticketTypeService: TicketTypeService,
        private toastService: ToastrService,
        protected dialog: MatDialog) {
            super(dialog);
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getTicketTypes();
        });
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    getTicketTypes() {
        this.ticketTypeService.getTicketTypes()
            .subscribe(data => {
                this.ticketTypes = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    public addTicketType(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddTicketTypeComponent>;
        dialogRef = this.dialog.open(AddTicketTypeComponent, {
            width: '600px',
            height: '320px',
        });
        return dialogRef.afterClosed();
    }

    public editTicketType(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditTicketTypeComponent>;
        dialogRef = this.dialog.open(EditTicketTypeComponent, {
            data: id,
            width: '400px',
        });
        return dialogRef.afterClosed();
    }

    onDeleteTicketType(ticketType: TicketType) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete ticket type ${ticketType.ticketTypeName}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteTicketType(ticketType);
            }
        });
    }

    deleteTicketType(ticketType: TicketType): void {
        this.ticketTypeService.deleteTicketType(ticketType)
            .subscribe(data => {
                this.ticketTypes = this.ticketTypes.filter(u => u !== ticketType);
                this.toastService.success(`Ticket type ${ticketType.ticketTypeName} deleted`);
                this.getTicketTypes();
            });
    };

    toggleSelection($event) {
        if($event.checked) {
            this.ticketTypes.forEach(ticketType => ticketType.checked = true);
        } else {
            this.ticketTypes.forEach(ticketType => ticketType.checked = false);
        }
    }

}
