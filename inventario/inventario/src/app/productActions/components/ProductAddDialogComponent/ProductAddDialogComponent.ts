import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'product-add-dialog-component',
  imports: [ReactiveFormsModule],
  templateUrl: './ProductAddDialogComponent.html',
  styleUrl: './ProductAddDialogComponent.css',
})
export class ProductAddDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ProductAddDialogComponent>);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
