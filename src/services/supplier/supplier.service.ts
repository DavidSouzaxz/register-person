// ...existing code...
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  // Mock: salva localmente (simulado) e retorna Observable de sucesso
  create(data: FormData): Observable<any> {
    console.log('SupplierService.create (mock):', data);
    // Simula um atraso de 500ms e retorna sucesso
    return of({ success: true }).pipe(delay(500));
  }

  // Opcional: método para listar itens mock
  list(): Observable<any[]> {
    const mock = [
      { id: 1, name: 'Fornecedor A', type: 'supplier', email: 'a@ex.com' },
      { id: 2, name: 'Cliente B', type: 'customer', email: 'b@ex.com' },
    ];
    return of(mock).pipe(delay(300));
  }
}
