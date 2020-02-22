import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IInfo} from '../interface/i-info';

const URL = environment.URL;

@Injectable({
    providedIn: 'root'
})
export class IndiService {

    private apiINQUrl = URL + '/insertINQLog';
    private apiSCRPUrl = URL + '/insertSCRPlog';

    constructor(private httpClient: HttpClient) {
    }

    postINQ(indiInfo: IInfo): Observable<IInfo> {
        return this.httpClient.post<IInfo>(this.apiINQUrl, indiInfo);
    }


    postSCRP(indiInfo: IInfo): Observable<IInfo> {
        return this.httpClient.post<IInfo>(this.apiSCRPUrl, indiInfo);
    }

}
