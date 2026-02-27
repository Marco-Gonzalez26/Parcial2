import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Plus, Pencil, Trash2, PackageSearch } from 'lucide-angular';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, LucideAngularModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products = signal<Product[]>([]);

  readonly Plus = Plus;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly PackageSearch = PackageSearch;

  ngOnInit() {
    this.load();
  }

  load() {
    this.productService.getProducts().subscribe((data) => this.products.set(data));
  }

  delete(id: number) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    this.productService.deleteProduct(id).subscribe(() => this.load());
  }
}
