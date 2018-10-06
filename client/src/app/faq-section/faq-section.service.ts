import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FaqSection } from './faq-section.model';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FaqSectionService {

    constructor(private http: HttpClient) { }

    private faqSectionUrl = environment.baseUrl + '/faqSection';

    public addFaqSection(faqSection) {
        return this.http.post<FaqSection>(this.faqSectionUrl, faqSection);
    }

    public getFaqSection(id: number) {
        return this.http.get<FaqSection>(this.faqSectionUrl + "/" + id);
    }

    public getFaqSections() {
        return this.http.get<FaqSection[]>(this.faqSectionUrl);
    }

    public updateFaqSection(faqSection) {
        return this.http.put<FaqSection>(this.faqSectionUrl + "/" + faqSection.faqSectionid, faqSection, httpOptions);
    }

    public deleteFaqSection(faqSection) {
        return this.http.delete(this.faqSectionUrl + "/" + faqSection.faqSectionId);
    }

}
