import { Component, OnInit, Input } from '@angular/core';
import {Subject} from 'rxjs/Subject';

import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { view, postTitle } from '../../shared/constants';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsObservable = new Subject<Post[]>();
  @Input() title = postTitle;
  @Input() view = view;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postsService.getPosts()
      .subscribe(posts => this.postsObservable.next(posts));
  }

}
