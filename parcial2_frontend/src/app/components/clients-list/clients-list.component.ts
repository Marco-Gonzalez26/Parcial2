import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Plus, Pencil, Trash2, UsersRound } from 'lucide-angular';

import { ClientService } from './../../services/client.service';
import { Client } from './../../interfaces/client.interface';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './clients-list.component.html',
})
export class ClientListComponent implements OnInit {
  constructor(private clientService: ClientService) {}

  clients = signal<Client[]>([]);

  readonly Plus = Plus;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly UsersRound = UsersRound;

  ngOnInit() {
    this.load();
  }

  load() {
    this.clientService.getClients().subscribe((data) => this.clients.set(data));
  }

  delete(id: number) {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return;
    this.clientService.deleteClient(id).subscribe(() => this.load());
  }
}
