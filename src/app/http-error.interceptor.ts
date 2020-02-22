import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: There is problem with your app. Please reload or try another device.`;
                    } else if (error.status === 500) {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: There is problem with the server.` +
                            ` Please wait a minute or contact the help for more information.`;
                    } else if (error.status === 400) {
                        errorMessage = 'Wrong username or password';
                    } else {
                        errorMessage = `Error Code: ${error.message + ' ' + error.error + ' '
                        + error.headers + ' ' + error.name + ' ' + error.statusText + ' ' + error.type}\nMessage: unknown problem.`;
                    }
                    window.alert(errorMessage);
                    return throwError(errorMessage);
                })
            );
    }
}
