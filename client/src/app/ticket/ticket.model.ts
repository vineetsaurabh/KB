import { User } from "../user/user.model";
import { Rating } from "./rating.model"

export class Ticket {
    ticketId: string;
    name: string;
    type: string;
    summary: string;
    description: string;
    priority: string;
    product: string;
    module: string;
    operation: string;
    status: string;
    assignedTo: User;
    assignedBy: User;
    assignedOn: Date;
    createdBy: User;
    creationDate: Date;
    lastModifiedBy: User;
    lastModifiedDate: Date;
    checked: boolean;
    ratings: Set<Rating>;
}