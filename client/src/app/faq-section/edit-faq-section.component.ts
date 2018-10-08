import { Component, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { FaqSection } from './faq-section.model';
import { FaqSectionService } from './faq-section.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';
import { Faq } from '../faq/faq.model';


@Injectable()
@Component({
    templateUrl: './edit-faq-section.component.html'
})
export class EditFaqSectionComponent extends SelectUserComponent {

    public faqSection: FaqSection = {
        faqSectionId: '',
        name: '',
        description: '',
        faqs: new Set<Faq>(),
        createdBy: new User(),
        createdOn: new Date(),
        modifiedBy: new User(),
        modifiedOn: new Date(),
        checked: false,
    };
    id: string;
    faqSectionForm: FormGroup;
    defaultFaqSection: boolean;

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private faqSectionService: FaqSectionService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditFaqSectionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FaqSection) {
        super(fb, userService);
        this.faqSection = this.data;
    }

    ngOnInit() {
        super.ngOnInit();
        this.faqSectionForm = this.fb.group({
            faqSectionId: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    editFaqSection() {
        this.faqSectionService.updateFaqSection(this.faqSection)
            .subscribe(res => {
                this.dialogRef.close(false);
            });
    }

}
