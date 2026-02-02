import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../services/product.service';

@Component({
  selector: 'delete-sale',
  imports: [],
  templateUrl: 'deleteSale.html',
  styleUrl: './deleteSale.css',
})
export class DeleteSale {

  data = inject(MAT_DIALOG_DATA) as Product;
  private dialogRef = inject(MatDialogRef<DeleteSale>);

  confirmDelete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
