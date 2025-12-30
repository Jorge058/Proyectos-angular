import { Component, inject, signal, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'sales-component',
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './salesComponent.html',
  styleUrl: './salesComponent.css',
})
export class SalesComponent implements OnInit {
  saleForm!: FormGroup;
  saleFormSignal = signal<any>(null);

  private fb = inject(FormBuilder);
  private saleService = inject(VentasService);

  ngOnInit() {
    this.saleForm = this.fb.group({
      product_id: [0, Validators.required],
      quantity: [1, Validators.required, Validators.min(1)],
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
          product_id: 0,
          quantity: 1,
          date: new Date().toISOString().split('T')[0],
        });
      });
    }
  }
}
