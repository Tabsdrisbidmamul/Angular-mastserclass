import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Posts } from './models/Posts.model';
import { PostsService } from './services/posts.service';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Posts[] = [];
  isFetching = false;
  errorMsg = '';

  postForm!: FormGroup;

  destroy$ = new Subject();

  constructor(private _postService: PostsService) {}

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });

    this._postService.loadedPosts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((posts) => {
        this.loadedPosts = posts;
      });

    this._postService.isFetching$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => {
        this.isFetching = loader;
      });

    this._postService.errorMsg$
      .pipe(takeUntil(this.destroy$))
      .subscribe((msg) => {
        this.errorMsg = msg;
      });

    this._postService.getPostsSubject();
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }

  onCreatePost() {
    this._postService.postData(this.postForm.value);
    this.postForm.reset();
  }

  onFetchPosts() {
    this._postService.getPostsSubject();
  }

  onClearPosts() {
    this._postService.deletePosts();
  }

  onHandleErrorClick() {
    this._postService.errorMsg$.next('');
  }

  /**
   * If you're service is for one component - where there are not several components subscribing to the service subject.
   *
   * Handling it within the component is not a bad approach - and probably is better.
   *
   * However once there is more than one component listening to the values - then that is when you outsource the subject to the service - and have the component subscribe to it.
   */
  private fetchPostsSubscribe() {
    this.isFetching = true;

    this._postService.getPosts().subscribe((posts) => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }
}
