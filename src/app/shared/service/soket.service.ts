import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SocketService {
    private url = environment.URL_SOCKET;
    private socket;

    constructor() {
        this.socket = io.connect(this.url);
    }


    public getA0001Messages = () => {
        return Observable.create((observer) => {
            this.socket.on('mesage_A0001', (message) => {
                observer.next(message);
            });
        });
    }

}
