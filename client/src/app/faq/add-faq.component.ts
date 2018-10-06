import { Component, Injectable, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { FaqService } from './faq.service';
import { Faq } from './faq.model';
import { FaqSection } from '../faq-section/faq-section.model';
import { FaqSectionService } from '../faq-section/faq-section.service';

@Injectable()
@Component({
    templateUrl: './add-faq.component.html'
})
export class AddFaqComponent {

    faq: Faq = new Faq();
    faqSections: FaqSection[];

    constructor(
        private toastService: ToastrService,
        private faqService: FaqService,
        private faqSectionService: FaqSectionService,
        public dialogRef: MatDialogRef<AddFaqComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string[]) {
    }

    ngOnInit() {
        this.faqSectionService.getFaqSections()
            .subscribe(data => {
                this.faqSections = data;
            });
    }

    createFaq(): void {
        this.faqService.addFaq(this.faq)
            .subscribe(data => {
                this.toastService.success(`FAQ added`);
                this.dialogRef.close(false);
            });
    };

}
