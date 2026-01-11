import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sale } from '../../../services/ventas.service';
import { Product, ProductService } from '../../../services/product.service';

@Component({
  selector: 'sale-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './saleEdit.html',
  styleUrl: './saleEdit.css',
})
export class SaleEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<SaleEditComponent>);
  private productService = inject(ProductService);

  data = inject(MAT_DIALOG_DATA) as Sale;
  products = signal<Product[]>([]);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => this.products.set(data));
  }

  formEdit: FormGroup = this.fb.group({
    product_id: [this.data.product_id, Validators.required],
    quantity: [this.data.quantity, [Validators.required, Validators.min(1)]],
    date: [this.data.date, Validators.required],
  });

  save() {
    if (this.formEdit.valid) {
      const selectedProductId = this.formEdit.value.product_id;
      const selectedProduct = this.products().find((p) => p.id === selectedProductId);

      if (selectedProduct && selectedProduct.stock <= 0) {
        alert('No se puede realizar la venta: el producto no tiene stock disponible.');
        return;
      }
      this.dialogRef.close({ id: this.data.id, ...this.formEdit.value });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
