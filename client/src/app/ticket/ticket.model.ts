import { User } from "../user/user.model";
import { Rating } from "./rating.model"
import { State } from "../state/state.model";
import { Product } from "../product/product.model";
import { Module } from "../module/module.model";

export class Ticket {
    ticketId: string;
    name: string;
    type: string;
    summary: string;
    description: string;
    priority: string;
    product: Product;
    module: Module;
    operation: string;
    status: State;
    statusLabel: string;
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