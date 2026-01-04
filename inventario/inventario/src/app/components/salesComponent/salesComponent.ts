import { Component, inject, signal, OnInit } from '@angular/core';
import { Sale, Sales, VentasService } from '../../services/ventas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'sales-component',
  imports: [ReactiveFormsModule, JsonPipe, DatePipe],
  templateUrl: './salesComponent.html',
  styleUrl: './salesComponent.css',
})
export class SalesComponent implements OnInit {
  saleForm!: FormGroup;
  saleFormSignal = signal<any>(null);

  private fb = inject(FormBuilder);
  private saleService = inject(VentasService);
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  sales = signal<Sales[]>([]);

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);

    });

    this.saleService.getSales().subscribe((data) => {
      this.sales.set(data)
    })

    this.saleForm = this.fb.group({
      product_id: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      date: [new Date().toISOString().split('T')[0], Validators.required],
    });

    this.saleForm.valueChanges.subscribe((value) => {
      this.saleFormSignal.set(value);
    });
  }

  addSale() {
    if (this.saleForm.valid) {
      this.saleService.addSale(this.saleFormSignal()).subscribe(() => {
        alert('Venta registrada');
        this.saleForm.reset({
          product_id: null,
          quantity: 1,
          date: new Date().toISOString().split('T')[0],
        });
      });
    }
  }
}
