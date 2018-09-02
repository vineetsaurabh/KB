import { User } from "../user/user.model";
import { Rating } from "./rating.model"
import { State } from "../state/state.model";

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
    status: State;
    assignedTo: User;
    assignedBy: User;
    assignedOn: Date;
    createdBy: User;
    creationDate: Date;
    lastModifiedBy: User;
    lastModifiedDate: Date;
    closedBy: User;
    closedOn: Date;
    checked: boolean;
    ratings: Set<Rating>;
}