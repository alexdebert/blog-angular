import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading:boolean = true ;

  isLoading() {
    this.loading = true;
  }

  isLoaded() {
    this.loading = false;
  }


}
