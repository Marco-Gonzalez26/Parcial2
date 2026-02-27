import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Plus, Trash2, ShoppingBag } from 'lucide-angular';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink, LucideAngularModule],
  templateUrl: './orders-list.component.html',
})
export class OrderListComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  orders = signal<Order[]>([]);

  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly ShoppingBag = ShoppingBag;

  ngOnInit() {
    this.load();
  }

  load() {
    this.orderService.getOrders().subscribe((data) => {
      console.log({ orders: data });
      this.orders.set(data);
    });
  }

  updateStatus(id: number, estado: string) {
    this.orderService.updateOrderStatus(id, estado).subscribe(() => this.load());
  }

  delete(id: number) {
    if (!confirm('¿Estás seguro de eliminar esta orden?')) return;
    this.orderService.deleteOrder(id).subscribe(() => this.load());
  }

  getSelectClass(estado: string): string {
    const map: Record<string, string> = {
      Pendiente: 'bg-amber-500/10 text-amber-400',
      Completada: 'bg-emerald-500/10 text-emerald-400',
      Cancelada: 'bg-red-500/10 text-red-400',
    };
    return map[estado] ?? 'bg-neutral-800 text-neutral-400';
  }
}
