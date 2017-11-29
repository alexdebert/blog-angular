import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../post';
import { Comment } from '../comment';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() post : Post;
  @Input() comments : Comment[];

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPostWithComments();
    this.getComment();
  }

  getPostWithComments(): void {
    const postId = +this.route.snapshot.paramMap.get('id');
    this.postsService.getPostWithComments(postId)
      .subscribe(post => this.post = post);
  }

  getComment(): void {
    const postId = +this.route.snapshot.paramMap.get('id');
    this.postsService.getComment(postId)
      .subscribe(comments => this.comments = comments);
  }

  goBack(): void {
    this.location.back();
  }
}
