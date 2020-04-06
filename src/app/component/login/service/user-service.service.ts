import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../interface/i-user';
import {ICheckPhone} from '../interface/ICheckPhone';
import {tap} from 'rxjs/operators';
import {IFormUpdateScrapLog} from '../interface/IFormUpdateScrapLog';
import {IResultCheckNiceSS} from '../interface/IResultCheckNiceSS';
import {IFormRqCheckNiceSs} from '../interface/IFormRqCheckNiceSs';

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

  CheckNiceSsKeyValidToUpdate(form: IFormRqCheckNiceSs): Observable<IResultCheckNiceSS> {
      return this.http.post<IResultCheckNiceSS>(apiUrl + '/CheckNiceSsKeyValidToUpdate', form).pipe(
          tap(result => {
              console.log(result);
          }, e => {
              console.log(e);
          })
      );
    }

  getNiceSsId(phone: string, custCD: string): Observable<ICheckPhone> {
      return this.http.get<ICheckPhone>(apiUrl + '/checkPhoneNumber?phoneNumber=' + phone + '&custCD=' + custCD).pipe(
        tap(result => {
          console.log(result);
        }, e => {
          console.log(e);
        })
    );
  }

  updateIdPwNationIDToScrapLog(form: IFormUpdateScrapLog): Observable<any> {
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
