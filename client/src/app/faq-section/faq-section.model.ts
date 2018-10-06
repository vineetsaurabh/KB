import { User } from "../user/user.model";
import { Faq } from "../faq/faq.model";

export class FaqSection {
    faqSectionId: string;
    name: string;
    description: string;
    faqs: Set<Faq>;
    createdBy: User;
    createdOn: Date;
    modifiedBy: User;
    modifiedOn: Date;
    checked: boolean;
}
