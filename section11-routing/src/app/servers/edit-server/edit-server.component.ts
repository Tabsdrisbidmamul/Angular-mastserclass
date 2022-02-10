import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate-guard.service';

import { ServersService } from '../../services/servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  private destroy$ = new Subject();
  server: { id: number; name: string; status: string } | undefined;
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
        this.serverName = this.server!.name;
        this.serverStatus = this.server!.status;
      });

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((query: Params) => {
        console.log(query);
        this.allowEdit = +query['allowEdit'] === 1 ? true : false;
      });

    this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe((frag) => {});
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
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    }

    if (
      (this.serverName !== this.server?.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
