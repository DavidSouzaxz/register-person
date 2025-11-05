import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { TableListComponent } from "./table-list/table-list.component";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  imports: [SupplierFormComponent, TableListComponent, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'register-person';

  @ViewChild(TableListComponent) tableListComponent!: TableListComponent;

  handleNewSupplier(payload: { name: string; type: string; email: string; document: string }) {
    this.tableListComponent.addItem(payload);
  }
}
