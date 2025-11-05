import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';

@Component({
  selector: 'app-root',
  imports: [SupplierFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'register-person';
}
