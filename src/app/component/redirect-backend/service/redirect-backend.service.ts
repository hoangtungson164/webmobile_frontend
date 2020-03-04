import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectBackendService {

  constructor(private httpClient: HttpClient) { }


  postBank(url: string): Observable<any> {
    return this.httpClient.post('https://localhost:3001/redirect', url);
  }
}
