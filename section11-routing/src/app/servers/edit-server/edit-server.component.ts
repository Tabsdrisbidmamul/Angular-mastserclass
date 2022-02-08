import { Component, OnInit } from '@angular/core';

import { ServersService } from '../../services/servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string } | undefined;
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService) {}

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server!.name;
    this.serverStatus = this.server!.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server!.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
}
