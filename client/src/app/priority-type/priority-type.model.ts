import { User } from "../user/user.model";

export class PriorityType {
    priorityTypeid: string;
    priorityTypeName: string;
    description: string;
    defaultPriorityType: boolean;
    sla: string;
    escalateTo: User;
    timeToResolve: number;
    checked: boolean;
}