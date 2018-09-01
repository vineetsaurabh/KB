import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { TicketType } from "./ticket-type.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TicketTypeService {

    constructor(private http: HttpClient) { }

    private ticketTypeUrl = environment.baseUrl + '/tickettype';

    public createTicketType(ticketType: TicketType) {
        return this.http.post<TicketType>(this.ticketTypeUrl, ticketType, httpOptions);
    }

    public getTicketTypes() {
        return this.http.get<TicketType[]>(this.ticketTypeUrl);
    }

    public getTicketType(ticketTypeid: number) {
        return this.http.get<TicketType>(this.ticketTypeUrl + "/" + ticketTypeid);
    }

    public updateTicketType(ticketType: TicketType) {
        return this.http.put<TicketType>(this.ticketTypeUrl + "/" + ticketType.ticketTypeid, ticketType, httpOptions);
    }

    public deleteTicketType(ticketType: TicketType) {
        return this.http.delete(this.ticketTypeUrl + "/" + ticketType.ticketTypeid);
    }

}