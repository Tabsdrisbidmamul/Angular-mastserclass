import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ServersService } from '../../services/servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  server: { id: number; name: string; status: string } | undefined;
  serverName = '';
  serverStatus = '';

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        console.log(params);
      });

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      console.log(query);
    });

    this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe((frag) => {
      console.log(frag);
    });

    this.server = this.serversService.getServer(1);
    this.serverName = this.server!.name;
    this.serverStatus = this.server!.status;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server!.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
}
