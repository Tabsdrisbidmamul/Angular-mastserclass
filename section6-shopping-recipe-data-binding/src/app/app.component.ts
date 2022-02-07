import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentRoute = 'recipe';

  title = 'section3-shopping-recipe';

  setRoute(route: string) {
    this.currentRoute = route;
  }
}
