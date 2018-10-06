import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from "rxjs";

import { FaqSectionService } from "../faq-section/faq-section.service";
import { AddFaqComponent } from './add-faq.component';
import { FaqSection } from "../faq-section/faq-section.model";

@Component({
  selector: 'list-faqs',
  templateUrl: './list-faq.component.html'
})
export class ListFaqComponent {

  faqSections: FaqSection[];

  constructor(
    private faqSectionService: FaqSectionService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dialog.afterAllClosed.subscribe(() => {
      this.getFaqSections();
    });
  }

  getFaqSections() {
    this.faqSectionService.getFaqSections()
        .subscribe(data => {
            this.faqSections = data;
        });
}

  addFaq(): Observable<boolean> {
    let dialogRef: MatDialogRef<AddFaqComponent>;
    dialogRef = this.dialog.open(AddFaqComponent, {
      width: '900px',
      height: '600px',
      disableClose: true,
      autoFocus: false,
    });
    return dialogRef.afterClosed();
  }

}
