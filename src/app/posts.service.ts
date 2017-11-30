import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';

import { Post } from './post';

@Injectable()
export class PostsService {

  private basePath = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    const url = `${this.basePath}/posts`;
    return this.http.get<Post[]>(url)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  getPostWithComments (postId: number): Observable<any> {
    const url = `${this.basePath}/posts/${postId}`;
    const getPost = this.http.get(url).map(res => res);
    const getComments = this.getComment(postId);

    return Observable.forkJoin([getPost, getComments])
      .map(responses => {
        const post = responses[0];
        post.comments = responses[1];

        return post;
      });
  }

  getComment(postId: number): Observable<any> {
    const url = `${this.basePath}/posts/${postId}/comments`;
    return this.http.get(url).map(res => res);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
