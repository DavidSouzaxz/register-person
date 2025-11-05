import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  {
    path: 'register',
    loadComponent: () =>
      import('./supplier-form/supplier-form.component').then(
        (m) => m.SupplierFormComponent
      ),
  },
];
