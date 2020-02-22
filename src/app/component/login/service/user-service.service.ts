import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../interface/i-user';

const apiUrl = environment.URL;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = apiUrl + '/insertUser';

  constructor(private http: HttpClient) {
  }

  insertUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.loginUrl, user);
  }
}
