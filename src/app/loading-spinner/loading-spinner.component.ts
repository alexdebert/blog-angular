import { Component } from '@angular/core';
import { LoadingInterceptor } from '../loading.interceptor';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

  loading = false;

  constructor(private loadingInterceptor: LoadingInterceptor) {
    loadingInterceptor
      .onLoadingChanged
      .subscribe(isLoading => this.loading = isLoading);
  }
}
