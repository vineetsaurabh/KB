import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Comment } from './comment.model';
import { environment } from '../../environments/environment';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CommentService {

    constructor(private http: HttpClient) { }

    private commentUrl = environment.baseUrl + '/comment';

    public createComment(comment: Comment) {
        return this.http.post<Comment>(this.commentUrl, comment, httpOptions);
    }

    public getCommentsByTicketId(ticketid: string) {
        let params = new HttpParams();
        params = params.append('ticketid', ticketid);
        return this.http.get<Set<Comment>>(this.commentUrl + '/findbyticketid', { params: params });
    }

    public updateComment(comment: Comment) {
        return this.http.put<Comment>(this.commentUrl + "/" + comment.commentId, comment, httpOptions);
    }

    public deleteComment(comment: Comment) {
        return this.http.delete(this.commentUrl + "/" + comment.commentId);
    }

}
