import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../services/product.service';

@Component({
  selector: 'app-product-edit-dialog-component',
  imports: [ReactiveFormsModule],
  templateUrl: './ProductEditDialogComponent.html',
  styleUrl: './ProductEditDialogComponent.css',
})
export class ProductEditDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ProductEditDialogComponent>);
  data = inject(MAT_DIALOG_DATA) as Product;

  form: FormGroup = this.fb.group({
    id: [this.data.id],
    name: [this.data.name, Validators.required],
    price: [this.data.price, [Validators.required, Validators.min(0)]],
    stock: [this.data.stock, [Validators.required, Validators.min(0)]],
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
