import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupplierService } from '../../services/supplier/supplier.service';

const EMAIL_STRICT =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.[A-Za-z]{2,63}$";

@Component({
  selector: 'app-supplier-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss'],
  providers: [SupplierService],
})
export class SupplierFormComponent {
  @Output() newSupplier = new EventEmitter<{
    name: string;
    type: string;
    email: string;
    document: string;
  }>();
  files: File[] = [];
  loading = false;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private matSnackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['supplier', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(EMAIL_STRICT),
        ],
      ],
    });
  }

  onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;
    this.files = Array.from(input.files);
    this.matSnackBar.open(
      `${this.files.length} arquivo(s) selecionado(s)`,
      'Fechar',
      { duration: 2000 }
    );
  }

  emailError() {
    const c = this.form.controls['email'];
    if (c.hasError('required')) return 'Email é obrigatório';
    if (c.hasError('email')) return 'Email inválido';
    return '';
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = {
      ...this.form.value,
      document: this.files[0]?.name || 'N/A',
    };
    this.newSupplier.emit(payload);

    this.loading = true;
    this.supplierService.create(new FormData()).subscribe({
      next: () => {
        this.loading = false;
        this.matSnackBar.open('Cadastro realizado com sucesso', 'Fechar', {
          duration: 3000,
        });
        this.form.reset({ type: 'supplier' });
        this.files = [];
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.matSnackBar.open('Erro ao salvar. Tente novamente.', 'Fechar', {
          duration: 4500,
        });
      },
    });
  }
}
