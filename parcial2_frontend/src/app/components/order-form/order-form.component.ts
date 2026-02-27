import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Save, Search, X, Plus, Minus } from 'lucide-angular';
import { OrderService } from '../../services/order.service';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';
import { Client } from '../../interfaces/client.interface';
import { Product } from '../../interfaces/product.interface';

interface OrderItem {
  product: Product;
  cantidad: number;
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule,
    FormsModule,
  ],
  templateUrl: './order-form.component.html',
})
export class OrderFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private productService: ProductService,
    private router: Router,
  ) {}

  clients = signal<Client[]>([]);
  allProducts = signal<Product[]>([]);
  searchResults = signal<Product[]>([]);
  orderItems = signal<OrderItem[]>([]);
  saving = signal(false);
  serverError = signal('');
  searchTerm = '';

  readonly ArrowLeft = ArrowLeft;
  readonly Save = Save;
  readonly Search = Search;
  readonly X = X;
  readonly Plus = Plus;
  readonly Minus = Minus;

  total = computed(() =>
    this.orderItems().reduce((sum, item) => sum + item.product.precio * item.cantidad, 0),
  );

  form = this.fb.group({
    clienteId: ['', Validators.required],
  });

  ngOnInit() {
    this.clientService.getClients().subscribe((data) => this.clients.set(data));
    this.productService.getProducts().subscribe((data) => this.allProducts.set(data));
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.searchResults.set([]);
      return;
    }
    const already = this.orderItems().map((i) => i.product.productoId);
    this.searchResults.set(
      this.allProducts()
        .filter((p) => p.nombre.toLowerCase().includes(term) && !already.includes(p.productoId))
        .slice(0, 5),
    );
  }

  addProduct(product: Product) {
    this.orderItems.update((items) => [...items, { product, cantidad: 1 }]);
    this.searchTerm = '';
    this.searchResults.set([]);
  }

  removeProduct(productoId: number) {
    this.orderItems.update((items) => items.filter((i) => i.product.productoId !== productoId));
  }

  increaseQty(item: OrderItem) {
    this.orderItems.update((items) =>
      items.map((i) =>
        i.product.productoId === item.product.productoId ? { ...i, cantidad: i.cantidad + 1 } : i,
      ),
    );
  }

  decreaseQty(item: OrderItem) {
    if (item.cantidad === 1) {
      this.removeProduct(item.product.productoId);
      return;
    }
    this.orderItems.update((items) =>
      items.map((i) =>
        i.product.productoId === item.product.productoId ? { ...i, cantidad: i.cantidad - 1 } : i,
      ),
    );
  }

  onSubmit() {
    if (this.form.invalid || this.orderItems().length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.serverError.set('');

    const payload: any = {
      clienteId: +this.form.value.clienteId!,
      detallesOrden: this.orderItems().map((i) => ({
        productoId: i.product.productoId,
        cantidad: i.cantidad,
        precioUnitario: i.product.precio * i.cantidad,
      })),
    };

    this.orderService.createOrder(payload).subscribe({
      next: () => this.router.navigate(['/ordenes']),
      error: (err) => {
        this.saving.set(false);
        this.serverError.set(err.error?.message ?? 'Ocurrió un error al guardar.');
      },
    });
  }

  showError(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  getInputClass(field: string): string {
    const control = this.form.get(field);
    if (control?.invalid && control?.touched) return 'border-red-500 focus:border-red-400';
    if (control?.valid && control?.touched) return 'border-emerald-600 focus:border-emerald-500';
    return 'border-neutral-700 focus:border-sky-500';
  }
}
