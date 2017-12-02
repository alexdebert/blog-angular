import { Component, OnInit } from '@angular/core';

import { Post } from '../../models/post';

import {Subject} from 'rxjs/Subject';

import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsObservable = new Subject<Post[]>();
  title = 'All Posts';
  view = 'View';

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postsService.getPosts()
      .subscribe(posts => this.postsObservable.next(posts));
  }

}
