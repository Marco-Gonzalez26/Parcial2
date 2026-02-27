import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Package, ShoppingBag, Store, Users } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  readonly Store = Store;
  readonly Package = Package;
  readonly Users = Users;
  readonly ShoppingBag = ShoppingBag;
}
