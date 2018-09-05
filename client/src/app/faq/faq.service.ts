import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpRequest } from '@angular/common/http';

import { Faq } from './faq.model';
import { environment } from '../../environments/environment';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FaqService {

    constructor(private http: HttpClient) { }

    private faqUrl = environment.baseUrl + '/faq';

    public addFaq(faq) {
        return this.http.post<Faq>(this.faqUrl, faq);
    }

    public getFaq(id: number) {
        return this.http.get<Faq>(this.faqUrl + "/" + id);
    }

    public getFaqs() {
        return this.http.get<Faq[]>(this.faqUrl);
    }


    public updateFaq(faq) {
        return this.http.put<Faq>(this.faqUrl + "/" + faq.faqid, faq, httpOptions);
    }

    public deleteFaq(faq) {
        return this.http.delete(this.faqUrl + "/" + faq.faqId);
    }

    private behaviourSubject = new BehaviorSubject<number>(0);
    public noOfDeleted = this.behaviourSubject.asObservable();
    public emitFaqDeleted(number) {
        this.behaviourSubject.next(number);
    }

}
