import { Component, OnInit } from '@angular/core';
import { AgentService } from './services/agent.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'shopping-recipe';

  constructor(private _agentService: AgentService) {}

  ngOnInit(): void {
    this._agentService.fetchIngredients();
    this._agentService.fetchRecipes().subscribe();
  }
}
