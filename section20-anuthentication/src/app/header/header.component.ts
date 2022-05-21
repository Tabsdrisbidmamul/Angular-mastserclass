import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private routeUrl = '';

  constructor(private _agentService: AgentService, private _router: Router) {}

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeUrl = event.url;
      }
    });
  }

  onSaveHandler() {
    if (this.routeUrl.includes('recipes')) {
      this._agentService.putRecipes();
    }

    if (this.routeUrl.includes('shopping-list')) {
      this._agentService.putIngredients();
    }
  }

  onFetchHandler() {
    if (this.routeUrl.includes('recipes')) {
      this._agentService.fetchRecipes().subscribe();
    }

    if (this.routeUrl.includes('shopping-list')) {
      this._agentService.fetchIngredients();
    }
  }
}
