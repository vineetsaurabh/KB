import { User } from "../user/user.model";
import { FaqSection } from "../faq-section/faq-section.model";

export class Faq {
    faqId: string;
    faqSection: FaqSection;
    summary: string;
    description: string;
    createdBy: User;
    createdOn: Date;
    modifiedBy: User;
    modifiedOn: Date;
}
