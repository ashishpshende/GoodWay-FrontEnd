
/*Importing inbuilt modules & components provided by Angular*/
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptedHttp } from './InterceptedHttp';


/** Http interceptor providers */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptedHttp, multi: true },
];

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule
    ],
    providers: [httpInterceptorProviders],
    exports: [HttpClientModule]
})
export class HttpInterceptorModule { }