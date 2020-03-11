import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../interface/i-user';
import {ICheckPhone} from '../interface/ICheckPhone';
import {tap} from 'rxjs/operators';
import {IFormUpdateScrapLog} from '../interface/IFormUpdateScrapLog';

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

  checkPhoneNumber(phone: string): Observable<ICheckPhone> {
    return this.http.get<ICheckPhone>(apiUrl + '/checkPhoneNumber?phoneNumber=' + phone).pipe(
        tap(result => {
          console.log(result);
        }, e => {
          console.log(e);
        })
    );
  }

  updateIdPwScrapLog(form: IFormUpdateScrapLog): Observable<any> {
      return this.http.put<any>( apiUrl + '/updateIdAndPwScrapLog' , form).pipe(
          tap(
              result => {
                  console.log(result);
              }, e => {
                  console.log(e);
              }
          )
      );
  }
}
