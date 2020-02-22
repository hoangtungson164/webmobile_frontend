import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IInfo} from '../interface/i-info';

const URL = environment.externalURL;

@Injectable({
    providedIn: 'root'
})
export class IndiService {

    private apiURL = URL + '/CIC_MACR_RQST';

    constructor(private httpClient: HttpClient) {
    }

    postIndi(indiInfo: IInfo): Observable<IInfo> {
        return this.httpClient.post<IInfo>(this.apiURL, indiInfo);
    }

}
