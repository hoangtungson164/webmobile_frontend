import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBank} from '../interface/ibank';
import {map} from 'rxjs/operators';
import {IBankConsensus} from '../../bank-consensus/interface/i-bank-consensus';


const URL = environment.URL;
@Injectable({
  providedIn: 'root'
})
export class BankService {

  private apiURL = URL + '/banks';

  constructor(private httpClient: HttpClient) { }

  getBankConsensusById(id: number): Observable<IBankConsensus> {
    return this.httpClient.get<IBankConsensus>(this.apiURL + '/' + id + '/consent');
  }

  getBanks(count = 10): Observable<IBank[]> {
    return this.httpClient.get<IBank[]>(this.apiURL).pipe(
      map(data => data.filter((todo, i) => i < count))
    );
  }

}
