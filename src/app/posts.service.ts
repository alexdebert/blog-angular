import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { Post } from './post';
import { Comment } from './comment';


@Injectable()
export class PostsService {

  private basePath = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient,
  ) { }

  getPosts(): Observable<Post[]> {
    const url = `${this.basePath}/posts`
    return this.http.get<Post[]>(url)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  getPostWithComments (postId: number): Observable<Post> {
    const url = `${this.basePath}/posts/${postId}`;
    return this.http.get<Post>(url).pipe(
      catchError(this.handleError<Post>(`getPostWithComments postId=${postId}`))
    );
  }

  getComment(postId: number): Observable<Comment[]> {
    const url = `${this.basePath}/posts/${postId}/comments`;
    return this.http.get<Comment[]>(url).pipe(
      catchError(this.handleError<Comment[]>(`getComment postId=${postId}`))
    );
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
