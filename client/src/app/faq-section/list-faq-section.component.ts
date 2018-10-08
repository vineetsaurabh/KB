
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { FaqSection } from './faq-section.model';
import { FaqSectionService } from './faq-section.service';
import { AddFaqSectionComponent } from './add-faq-section.component';
import { EditFaqSectionComponent } from './edit-faq-section.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { ListComponent } from '../common/list.component';
import { TokenStorage } from '../login/token.storage';

@Component({
    selector: 'app-comp',
    templateUrl: './list-faq-section.component.html'
})
export class ListFaqSectionComponent extends ListComponent {

    faqSections: FaqSection[];
    allColumns = ['Checkbox', 'Name', 'Description', 'Actions'];
    displayedColumns = ['Checkbox', 'Name', 'Description', 'Actions'];
    dataSource: MatTableDataSource<FaqSection>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private faqSectionService: FaqSectionService,
        private toastService: ToastrService,
        protected token: TokenStorage,
        protected dialog: MatDialog) {
            super(token, dialog);
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getFaqSections();
        });
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    getFaqSections() {
        this.faqSectionService.getFaqSections()
            .subscribe(data => {
                this.faqSections = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    addFaqSection(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddFaqSectionComponent>;
        dialogRef = this.dialog.open(AddFaqSectionComponent, {
            width: '600px',
            height: '500px',
        });
        return dialogRef.afterClosed();
    }

    editFaqSection(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditFaqSectionComponent>;
        dialogRef = this.dialog.open(EditFaqSectionComponent, {
            data: id,
            width: '400px',
        });
        return dialogRef.afterClosed();
    }

    onDeleteFaqSection(faqSection: FaqSection) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete faq section ${faqSection.name}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteFaqSection(faqSection);
            }
        });
    }

    deleteFaqSection(faqSection: FaqSection): void {
        this.faqSectionService.deleteFaqSection(faqSection)
            .subscribe(data => {
                this.faqSections = this.faqSections.filter(u => u !== faqSection);
                this.toastService.success(`Faq Section ${faqSection.name} deleted`);
                this.getFaqSections();
            });
    };

    toggleSelection($event) {
        if($event.checked) {
            this.faqSections.forEach(faqSection => faqSection.checked = true);
        } else {
            this.faqSections.forEach(faqSection => faqSection.checked = false);
        }
    }

}
