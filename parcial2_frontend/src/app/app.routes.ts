import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full',
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./components/product-list/product-list.component').then(
        (m) => m.ProductListComponent,
      ),
  },
  {
    path: 'productos/nuevo',
    loadComponent: () =>
      import('./components/product-form/product-form.component').then(
        (m) => m.ProductFormComponent,
      ),
  },
  {
    path: 'productos/editar/:id',
    loadComponent: () =>
      import('./components/product-form/product-form.component').then(
        (m) => m.ProductFormComponent,
      ),
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./components/clients-list/clients-list.component').then((m) => m.ClientListComponent),
  },
  {
    path: 'clientes/nuevo',
    loadComponent: () =>
      import('./components/client-form/client-form.component').then((m) => m.ClientFormComponent),
  },
  {
    path: 'clientes/editar/:id',
    loadComponent: () =>
      import('./components/client-form/client-form.component').then((m) => m.ClientFormComponent),
  },
  {
    path: 'ordenes',
    loadComponent: () =>
      import('./components/orders-list/orders-list.component').then((m) => m.OrderListComponent),
  },
  {
    path: 'ordenes/nuevo',
    loadComponent: () =>
      import('./components/order-form/order-form.component').then((m) => m.OrderFormComponent),
  },
  {
    path: '**',
    redirectTo: 'productos',
  },
];
