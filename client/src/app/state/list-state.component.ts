
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { State } from './state.model';
import { StateService } from './state.service';
import { AddStateComponent } from './add-state.component';
import { EditStateComponent } from './edit-state.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { ListComponent } from '../common/list.component';
import { TokenStorage } from '../login/token.storage';

@Component({
    selector: 'app-comp',
    templateUrl: './list-state.component.html'
})
export class ListStateComponent extends ListComponent {

    states: State[];
    allColumns = ['Name', 'Description', 'Promote Label', 'Demote Label', 'Actions'];
    displayedColumns = ['Name', 'Description', 'Promote Label', 'Demote Label', 'Actions'];
    dataSource: MatTableDataSource<State>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private stateService: StateService,
        private toastService: ToastrService,
        protected token: TokenStorage,
        protected dialog: MatDialog) {
            super(token, dialog);
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getStates();
        });
    };

    getStates() {
        this.stateService.getStates()
            .subscribe(data => {
                this.states = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    public addState(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddStateComponent>;
        dialogRef = this.dialog.open(AddStateComponent, {
            width: '600px',
            maxHeight: '600px',
        });
        return dialogRef.afterClosed();
    }

    public editState(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditStateComponent>;
        dialogRef = this.dialog.open(EditStateComponent, {
            data: id,
            width: '600px',
            height: '400px',
        });
        return dialogRef.afterClosed();
    }

    onDeleteState(state: State) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete state ${state.stateName}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteState(state);
            }
        });
    }

    deleteState(state: State): void {
        this.stateService.deleteState(state)
            .subscribe(data => {
                this.states = this.states.filter(u => u !== state);
                this.toastService.success(`State ${state.stateName} deleted`);
                this.getStates();
            });
    };

}
