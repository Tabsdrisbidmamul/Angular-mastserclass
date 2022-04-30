import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Posts {
  title: string;
  content: string;
  id?: string;
}

interface Wrapper {
  content: Posts;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Posts[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPost();
  }

  onCreatePost(postData: Posts) {
    // Send Http request
    console.log(postData);
    this.http
      .post<Posts>(
        'https://angular-e2153-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  onFetchPosts() {
    this.onFetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  private onFetchPost() {
    this.http
      .get<Wrapper>(
        'https://angular-e2153-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((response) => {
          const postArray: Posts[] = [];
          let key: keyof typeof response;
          for (key in response) {
            postArray.push({ ...response[key], id: key });
          }
          return postArray;
        })
      )
      .subscribe((posts) => {
        console.log(posts);
        this.loadedPosts = posts;
      });
  }
}
