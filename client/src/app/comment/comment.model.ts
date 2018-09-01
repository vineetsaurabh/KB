import { User } from "../user/user.model";

export class Comment {
    commentId: string;
    ticketId: string;
    userid: string;
    content: string;
    user: User;
    createdOn: Date;
    modifiedOn: Date;
}
