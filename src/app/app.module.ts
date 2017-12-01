// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClarityModule } from 'clarity-angular';

// Components
import { AppComponent } from './app.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

// Services
import {PostsService} from './services/posts.service';

// Route
import { AppRoutingModule } from './app-routing.module';

// Interceptors
import { CallInterceptor } from './services/call.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostDetailComponent,
    HeaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PostsService,
    LoadingSpinnerComponent,
    CallInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CallInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
