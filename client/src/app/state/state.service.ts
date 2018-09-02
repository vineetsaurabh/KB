import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { State } from "./state.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StateService {

    constructor(private http: HttpClient) { }

    private stateUrl = environment.baseUrl + '/state';

    public createState(state: State) {
        return this.http.post<State>(this.stateUrl, state, httpOptions);
    }

    public getStates() {
        return this.http.get<State[]>(this.stateUrl);
    }

    public getState(stateId: number) {
        return this.http.get<State>(this.stateUrl + "/" + stateId);
    }

    public updateState(state: State) {
        return this.http.put<State>(this.stateUrl + "/" + state.stateId, state, httpOptions);
    }

    public deleteState(state: State) {
        return this.http.delete(this.stateUrl + "/" + state.stateId);
    }

}