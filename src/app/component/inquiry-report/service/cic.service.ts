import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment.prod';
import {ICic} from '../ICic';

const apiUrl = environment.URL;

@Injectable({
    providedIn: 'root'
})
export class CicService {

    private url = apiUrl + '/cic';

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    postCIC(input: ICic): Observable<ICic> {
        return this.httpClient.post<ICic>(this.url, input);
    }

}
