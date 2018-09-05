import { User } from '../user/user.model';

export class Team {
    teamid: string;
    teamName: string;
    description: string;
    users: Set<User>;
    spoc: User;
    spocUserName: string;
    spocUserId: string;
    checked: boolean;
}