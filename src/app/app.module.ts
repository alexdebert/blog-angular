// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

// Services
import {PostsService} from './posts.service';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Interceptors
import { LoadingInterceptor } from './loading.interceptor';


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
    HttpClientModule,
    ClarityModule,
    AppRoutingModule
  ],
  providers: [
    PostsService,
    LoadingInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
