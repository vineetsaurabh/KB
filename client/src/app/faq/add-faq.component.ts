import { Component, Injectable, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { FaqService } from './faq.service';
import { Faq } from './faq.model';

@Injectable()
@Component({
    templateUrl: './add-faq.component.html'
})
export class AddFaqComponent {

    faq: Faq = new Faq();
    htmlDescription: string = '';

    constructor(
        private toastService: ToastrService,
        private faqService: FaqService,
        public dialogRef: MatDialogRef<AddFaqComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string[]) {
    }

    createFaq(): void {
        this.faq.description = this.htmlDescription;
        this.faqService.addFaq(this.faq)
            .subscribe(data => {
                this.toastService.success(`FAQ added`);
                this.dialogRef.close(false);
            });
    };

}
