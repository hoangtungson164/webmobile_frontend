import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBank} from '../../bank-list/interface/ibank';
import {map} from 'rxjs/operators';
import {IReport} from '../interface/i-report';
import {environment} from '../../../../environments/environment.prod';

const URL = environment.URL;

@Injectable({
    providedIn: 'root'
})
export class SendingInfoService {

    apiURL = URL + '/banks';

    constructor(private httpClient: HttpClient) {
    }

    getAllReport(count = 10, id: number): Observable<IReport[]> {
        return this.httpClient.get<IReport[]>(this.apiURL + '/' + id + '/report').pipe(
            map(data => data.filter((todo, i) => i < count))
        );
    }
}
