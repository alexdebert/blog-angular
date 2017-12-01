import { Injectable, EventEmitter } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';

import {AppComponent} from '../app.component'

@Injectable()
export class CallInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(private appComponent:AppComponent) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.onStarted(request);

    return next
      .handle(request)
      .finally(() => this.onFinished(request))
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Processing http error', response);
        }
        return Observable.throw(response);
      });
  }

  onStarted(request: HttpRequest<any>): void {
    this.appComponent.isLoading();
    this.requests.push(request);
  }

  onFinished(request: HttpRequest<any>): void {
    const index = this.requests.indexOf(request);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.appComponent.isLoaded();
  }

}
