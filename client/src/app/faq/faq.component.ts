import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

import { FaqService } from "./faq.service";
import { Faq } from "./faq.model";
import { TokenStorage } from "../login/token.storage";
import { RolaguruUtils } from '../util/rolaguru.util'

@Component({
    selector: 'faq-detail',
    templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {

    @Input() faq: Faq;
    @Input() faqs: Set<Faq>;
    @Output() faqsChange = new EventEmitter<Set<Faq>>();

    userid: string;
    editing: boolean = false;

    rolaguruUtils = RolaguruUtils.getInstance();

    constructor(
        private token: TokenStorage,
        private faqService: FaqService,
        private toastService: ToastrService) {
    }

    ngOnInit(): void {
        this.userid = this.token.getCurrentUserId();
    }

    openInEdit() {
        this.editing = true;
    }

    saveFaq() {
        this.editing = false;
        this.faqService.updateFaq(this.faq)
            .subscribe(data => {
                this.faq = data;
                this.toastService.success(`FAQ updated`);
            })
    }

    deleteFaq() {
        this.faqService.deleteFaq(this.faq)
            .subscribe(data => {
                let newFaqs: Set<Faq> = new Set<Faq>();
                this.faqs.forEach(faq => {
                    if (faq.faqId != this.faq.faqId) {
                        newFaqs.add(faq);
                    }
                })
                this.faqs = newFaqs;
                this.faqsChange.emit(this.faqs);
                this.toastService.success(`FAQ deleted`);

                this.faqService.emitFaqDeleted(1);
            })
    }

}
