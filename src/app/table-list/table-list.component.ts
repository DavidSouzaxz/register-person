import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-list',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'type', 'email', 'document', 'actions'];
  dataSource = new MatTableDataSource([
    { name: 'Fornecedor A', type: 'supplier', email: 'a@exemplo.com', document: 'file1.pdf' },
    { name: 'Cliente B', type: 'customer', email: 'b@exemplo.com', document: 'file2.docx' },
    { name: 'Fornecedor C', type: 'supplier', email: 'c@exemplo.com', document: 'file3.jpg' }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  delete(element: any): void {
    console.log('Deletar:', element);
    this.dataSource.data = this.dataSource.data.filter(item => item !== element);
  }

  download(element: any): void {
    console.log('Download:', element);
    // Simula o download do arquivo
    alert(`Download do arquivo: ${element.document}`);
  }

  validateFile(file: File): boolean {
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeInBytes) {
      alert('Arquivo muito grande. O tamanho máximo permitido é 2MB.');
      return false;
    }
    return true;
  }

  uploadFile(file: File): void {
    if (this.validateFile(file)) {
      console.log('Arquivo válido para upload:', file.name);
      // Adicione lógica para lidar com o upload seguro
    }
  }

  addItem(newItem: { name: string; type: string; email: string; document: string }): void {
    this.dataSource.data = [...this.dataSource.data, newItem];
    console.log('Novo item adicionado:', newItem);
  }
}
