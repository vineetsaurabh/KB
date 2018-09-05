import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from "rxjs";

import { FaqService } from "./faq.service";
import { Faq } from './faq.model';
import { AddFaqComponent } from './add-faq.component';

@Component({
  selector: 'list-faqs',
  templateUrl: './list-faq.component.html'
})
export class ListFaqComponent {

  faqs: Faq[];

  constructor(
    private faqService: FaqService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dialog.afterAllClosed.subscribe(() => {
      this.getFaqs();
    });
  }

  getFaqs() {
    this.faqService.getFaqs()
      .subscribe(data => {
        this.faqs = data;
      });
  }

  addFaq(): Observable<boolean> {
    let dialogRef: MatDialogRef<AddFaqComponent>;
    dialogRef = this.dialog.open(AddFaqComponent, {
      width: '900px',
      height: '600px',
    });
    return dialogRef.afterClosed();
  }

}
