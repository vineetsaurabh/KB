import { Ticket } from "./ticket.model";
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpRequest } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rating } from "./rating.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TicketService {

    constructor(private http: HttpClient) { }

    private ticketUrl = environment.baseUrl + '/ticket';

    private ticketSubscribeUrl = environment.baseUrl + '/ticket-subscribe';

    private ratingUrl = environment.baseUrl + '/rating';

    createTicket(ticket: Ticket) {
        return this.http.post<Ticket>(this.ticketUrl, ticket, httpOptions);
    }

    getTicket(id: string) {
        return this.http.get<Ticket>(this.ticketUrl + "/" + id);
    }

    getAllTickets() {
        return this.http.get<Ticket[]>(this.ticketUrl);
    }

    findTickets(input: string) {
        let params = new HttpParams();
        params = params.append('input', input);
        return this.http.get<Ticket[]>(this.ticketUrl + '/findtickets', { params: params });
    }

    findTicketByName(name: string) {
        let params = new HttpParams();
        params = params.append('name', name);
        return this.http.get<Ticket>(this.ticketUrl + '/findbyname', { params: params });
    }

    updateTicket(ticket: Ticket) {
        return this.http.put<Ticket>(this.ticketUrl + "/" + ticket.ticketId, ticket, httpOptions);
    }

    deleteTicket(ticket: Ticket) {
        return this.http.delete(this.ticketUrl + "/" + ticket.ticketId);
    }

    deleteTickets(ticketIds: string[]) {
        let params = new HttpParams();
        params = params.append('ticketIds', ticketIds.join(","));
        return this.http.get<boolean>(this.ticketUrl + "/deletetickets", { params: params });
    }

    public subscribeTicket(ticketId) {
        return this.http.post(this.ticketSubscribeUrl, ticketId);
    }

    public unSubscribeTicket(ticketId) {
        return this.http.delete(this.ticketSubscribeUrl + "/" + ticketId);
    }

    public subscribeTickets(ticketIds: string) {
        let params = new HttpParams();
        params = params.append('ticketIds', ticketIds);
        return this.http.get<number>(this.ticketSubscribeUrl + "/subscribetickets", { params: params });
    }

    public unSubscribeTickets(ticketIds: string) {
        let params = new HttpParams();
        params = params.append('ticketIds', ticketIds);
        return this.http.get<number>(this.ticketSubscribeUrl + "/unsubscribetickets", { params: params });
    }

    public getSubscribedTickets() {
        return this.http.get<Ticket[]>(this.ticketSubscribeUrl + "/getsubscribedtickets");
    }

    public uploadFile(file: File, ticketId: string): Observable<HttpEvent<Ticket>> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        formdata.append('ticketid', ticketId);
        const req = new HttpRequest('POST', this.ticketUrl + '/uploadfile', formdata, {
            reportProgress: true
        });
        return this.http.request(req);
    }

    public downloadFile(id): Observable<any> {
        return this.http.get(this.ticketUrl + "/downloadfile/" + id, { observe: 'response', responseType: 'blob' });
    }

    public deleteFile(id): Observable<any>  {
        return this.http.delete<any>(this.ticketUrl + "/deletefile/" + id);
    }

    public createRating(rating) {
        return this.http.post<Rating>(this.ratingUrl, rating);
    }

    public updateRating(rating) {
        return this.http.put<Rating>(this.ratingUrl + "/" + rating.ratingId, rating, httpOptions);
    }

    public assignTickets(tickets: Ticket[]) {
        return this.http.put<Ticket>(this.ticketUrl + "/assignticket", tickets, httpOptions);
    }

    public closeTicket(ticket: Ticket) {
        return this.http.put<Ticket>(this.ticketUrl + "/closeticket", ticket, httpOptions);
    }

}