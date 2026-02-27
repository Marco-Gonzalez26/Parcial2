import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Save } from 'lucide-angular';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './client-form.component.html',
})
export class ClientFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  isEditing = signal(false);
  saving = signal(false);
  serverError = signal('');
  private editId: number | null = null;

  readonly ArrowLeft = ArrowLeft;
  readonly Save = Save;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    telefono: ['', [Validators.required, Validators.maxLength(20)]],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.editId = +id;
      this.clientService.getClient(this.editId).subscribe((client) => {
        this.form.patchValue(client);
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
      this.clientService.updateClient(this.editId!, value).subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: (err) => {
          this.saving.set(false);
          this.serverError.set(err.error?.message ?? 'Ocurrió un error al guardar.');
        },
      });
    } else {
      this.clientService.createClient(value).subscribe({
        next: () => this.router.navigate(['/clientes']),
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
    if (control.errors['email']) return 'Formato de email no válido.';
    if (control.errors['maxlength'])
      return `Máximo ${control.errors['maxlength'].requiredLength} caracteres.`;
    return 'Campo inválido.';
  }

  getInputClass(field: string): string {
    const control = this.form.get(field);
    if (control?.invalid && control?.touched) return 'border-red-500 focus:border-red-400';
    if (control?.valid && control?.touched) return 'border-emerald-600 focus:border-emerald-500';
    return 'border-neutral-700 focus:border-sky-500';
  }
}
