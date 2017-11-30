import { Injectable, EventEmitter } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];
  onLoadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();


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
    this.requests.push(request);
    this.notify();
  }

  onFinished(request: HttpRequest<any>): void {
    const index = this.requests.indexOf(request);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.notify();
  }

  private notify(): void {
    this.onLoadingChanged.emit(this.requests.length !== 0);
  }
}
