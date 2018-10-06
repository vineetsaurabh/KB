import { Component, Injectable, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { FaqSectionService } from './faq-section.service';
import { FaqSection } from './faq-section.model';

@Injectable()
@Component({
    templateUrl: './add-faq-section.component.html'
})
export class AddFaqSectionComponent {

    faqSection: FaqSection = new FaqSection();

    constructor(
        private toastService: ToastrService,
        private faqSectionService: FaqSectionService,
        public dialogRef: MatDialogRef<AddFaqSectionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string[]) {
    }

    createFaqSection(): void {
        this.faqSectionService.addFaqSection(this.faqSection)
            .subscribe(data => {
                this.toastService.success(`FAQ Section added`);
                this.dialogRef.close(false);
            });
    };

}
