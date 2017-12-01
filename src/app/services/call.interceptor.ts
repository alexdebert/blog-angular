import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';

import {LoadingSpinnerComponent} from '../components/loading-spinner/loading-spinner.component';

@Injectable()
export class CallInterceptor implements HttpInterceptor {

  constructor(private loadingSpinnerComponent: LoadingSpinnerComponent) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.onStarted();

    return next
      .handle(request)
      .finally(() => this.onFinished())
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Processing http error', response);
        }
        return Observable.throw(response);
      });
  }

  onStarted() {
    this.loadingSpinnerComponent.isLoading();
  }

  onFinished() {
    this.loadingSpinnerComponent.isLoaded();
  }

}
