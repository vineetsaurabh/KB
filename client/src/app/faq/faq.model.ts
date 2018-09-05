import { User } from "../user/user.model";

export class Faq {
    faqId: string;
    summary: string;
    description: string;
    createdBy: User;
    createdOn: Date;
    modifiedBy: User;
    modifiedOn: Date;
}
