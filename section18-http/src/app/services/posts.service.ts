import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from '../models/Posts.model';
import { catchError, map, tap } from 'rxjs/operators';
import { ReplaySubject, Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  loadedPosts$ = new ReplaySubject<Posts[]>(1);
  isFetching$ = new Subject<boolean>();
  errorMsg$ = new Subject<string>();

  constructor(private _http: HttpClient) {}

  postData(postData: Posts) {
    let postId = '';
    let loadedPosts: Posts[] = [];

    this._http
      .post<{ name: string }>(
        'https://angular-e2153-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe: 'body',
        }
      )
      .subscribe((response) => {
        postId = response.name;
      });

    this.loadedPosts$
      .subscribe((posts) => {
        loadedPosts = posts;
      })
      .unsubscribe();

    if (!postId) {
      this.loadedPosts$.next([...loadedPosts, { ...postData, id: postId }]);
    }
  }

  deletePosts() {
    this._http
      .delete('https://angular-e2153-default-rtdb.firebaseio.com/posts.json', {
        observe: 'events',
        responseType: 'json',
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      )
      .subscribe(() => {
        this.loadedPosts$.next([]);
      });
  }

  getPostsSubject() {
    this.isFetching$.next(true);
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');

    this._http
      .get<{ content: Posts }>(
        'https://angular-e2153-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Headers': 'Hello' }),
          params: searchParams,
          responseType: 'json',
        }
      )
      .pipe(
        map(this.transformPosts),
        catchError((error) => {
          console.log('PostsService ', error);
          this.errorMsg$.next(error);
          return throwError(error);
        })
      )
      .subscribe(
        (posts) => {
          this.isFetching$.next(false);
          this.loadedPosts$.next(posts);
        },
        (error) => {
          this.isFetching$.next(false);
        }
      );
  }

  getPosts() {
    return this._http
      .get<{ content: Posts }>(
        'https://angular-e2153-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(map(this.transformPosts));
  }

  private transformPosts(response: { content: Posts }): Posts[] {
    const postArray: Posts[] = [];
    let key: keyof typeof response;
    for (key in response) {
      postArray.push({ ...response[key], id: key });
    }
    return postArray;
  }
}
