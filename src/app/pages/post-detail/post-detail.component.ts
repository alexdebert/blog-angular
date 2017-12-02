import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Subject} from 'rxjs/Subject';

import { Post } from '../../models/post';

import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postObservable = new Subject<Post>();
  @Input() comments: Comment[];
  email = 'Email';
  comment = 'Comment';

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPostWithComments();
  }

  getPostWithComments(): void {
    const postId = +this.route.snapshot.paramMap.get('id');
    this.postsService.getPostWithComments(postId)
      .subscribe(post => this.postObservable.next(post));
  }

  goBack(): void {
    this.location.back();
  }
}
