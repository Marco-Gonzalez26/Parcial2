import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Save } from 'lucide-angular';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  isEditing = signal(false);
  saving = signal(false);
  serverError = signal('');
  private editId: number | null = null;

  readonly ArrowLeft = ArrowLeft;
  readonly Save = Save;

  tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40'];

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    talla: ['', Validators.required],
    color: ['', [Validators.required, Validators.maxLength(50)]],
    precio: [null as number | null, [Validators.required, Validators.min(0.01)]],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.editId = +id;
      this.productService.getProduct(this.editId).subscribe((product) => {
        this.form.patchValue(product);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.serverError.set('');
    const value = this.form.value as any;

    if (this.isEditing()) {
      this.productService.updateProduct(this.editId!, value).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (err) => {
          this.saving.set(false);
          this.serverError.set(err.error?.message ?? 'Ocurrió un error al guardar.');
        },
      });
    } else {
      this.productService.createProduct(value).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (err) => {
          this.saving.set(false);
          this.serverError.set(err.error?.message ?? 'Ocurrió un error al guardar.');
        },
      });
    }
  }

  showError(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  getError(field: string): string {
    const control = this.form.get(field);
    if (!control?.errors) return '';
    if (control.errors['required']) return 'Este campo es obligatorio.';
    if (control.errors['maxlength'])
      return `Máximo ${control.errors['maxlength'].requiredLength} caracteres.`;
    if (control.errors['min']) return 'El precio debe ser mayor a 0.';
    return 'Campo inválido.';
  }

  getInputClass(field: string): string {
    const control = this.form.get(field);
    if (control?.invalid && control?.touched) return 'border-red-500 focus:border-red-400';
    if (control?.valid && control?.touched) return 'border-emerald-600 focus:border-emerald-500';
    return 'border-neutral-700 focus:border-sky-500';
  }
}
