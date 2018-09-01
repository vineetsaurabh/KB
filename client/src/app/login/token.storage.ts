import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const CUREENT_USER = 'currentUser';
const CUREENT_USER_ID = 'currentUserId';
const SUBSCRIBED_TICKET = 'subscribedTicket';

@Injectable()
export class TokenStorage {

    constructor() { }

    signOut() {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(CUREENT_USER);
        window.sessionStorage.removeItem(CUREENT_USER_ID);
        window.sessionStorage.clear();
    }

    public saveToken(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public saveCurrentUser(currentUser: string) {
        window.sessionStorage.removeItem(CUREENT_USER);
        window.sessionStorage.setItem(CUREENT_USER, currentUser);
    }

    public getCurrentUser(): string {
        return sessionStorage.getItem(CUREENT_USER);
    }

    public saveCurrentUserId(currentUserId: string) {
        window.sessionStorage.removeItem(CUREENT_USER_ID);
        window.sessionStorage.setItem(CUREENT_USER_ID, currentUserId);
    }

    public getCurrentUserId(): string {
        return sessionStorage.getItem(CUREENT_USER_ID);
    }

    public saveSubscribedTicket(subscribedTickets: string) {
        window.sessionStorage.removeItem(SUBSCRIBED_TICKET);
        window.sessionStorage.setItem(SUBSCRIBED_TICKET, subscribedTickets);
    }

    public getSubscribedTicketIds(): string {
        return sessionStorage.getItem(SUBSCRIBED_TICKET);
    }

    public addSubscribedTicketIds(subscribedTicketId): string {
        let subscribedTicketIds = this.getSubscribedTicketIds();
        window.sessionStorage.removeItem(SUBSCRIBED_TICKET);
        this.saveSubscribedTicket(subscribedTicketIds + "," + subscribedTicketId);
        return this.getSubscribedTicketIds();
    }

    public removeSubscribedTicketIds(unSubscribedTicketId): string {
        let subscribedTicketIds = this.getSubscribedTicketIds();
        window.sessionStorage.removeItem(SUBSCRIBED_TICKET);
        let subscribedTicketIdsArr = subscribedTicketIds.split(",");
        let unSubscribedTicketIdsArr = unSubscribedTicketId.split(",");
        unSubscribedTicketIdsArr.forEach(unSubscribedTicketId => {
            let index = subscribedTicketIdsArr.indexOf(""+unSubscribedTicketId);
            if (index > -1) {
                subscribedTicketIdsArr.splice(index, 1);
            }
        });
        this.saveSubscribedTicket(subscribedTicketIdsArr.join(","));
        return this.getSubscribedTicketIds();
    }

}
