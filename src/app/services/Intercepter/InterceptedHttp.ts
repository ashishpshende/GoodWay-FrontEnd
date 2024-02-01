import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../Authentication/authentication.service';
const AUTH_TOKEN_KEY = 'Authorization';

@Injectable()
export class InterceptedHttp implements HttpInterceptor {
    constructor(private _router: Router,
        private authenticationService: AuthenticationService) { }
    static requestCount: number = 0;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var url = req.url;
        // if(url.includes("well-known"))
        // url = url.substring(0, url.lastIndexOf('.'));


        var _req;

        if (req.url.includes("microsoft"))
        {
           
            _req = req.clone({ url: url  });
            return next.handle(req);
        }            
        else
            _req = req.clone({ url: environment.apiURL + url});
            
        if (req.url.indexOf("login") == -1) {
            // Get the auth token from the service.
            const authToken = "Bearer "+ environment.API_KEY;

            // Clone the request and set the new header in one step.
            const authReq = _req.clone({ headers: req.headers.append('Authorization', authToken) });
            InterceptedHttp.requestCount++;
            // send cloned request with header to the next handler.
            return next.handle(authReq)
                .pipe(
                    map((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {

                        }
                        return event;
                    }),
                    catchError((error: HttpErrorResponse) => {
                        if (error.status == 401) {
                            this._router.navigate(['RouteConstants.LOGIN']);
                        }
                        return throwError(error);
                    }));
        }
        else {
            req = _req.clone();
            return next.handle(req);
        }

    }



}
