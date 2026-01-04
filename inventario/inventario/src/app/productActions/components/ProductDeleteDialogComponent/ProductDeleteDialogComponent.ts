import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../services/product.service';

@Component({
  selector: 'app-product-delete-dialog-component',
  imports: [],
  templateUrl: './ProductDeleteDialogComponent.html',
  styleUrl: './ProductDeleteDialogComponent.css',
})
export class ProductDeleteDialogComponent {
  data = inject(MAT_DIALOG_DATA) as Product;
  private dialogRef = inject(MatDialogRef<ProductDeleteDialogComponent>);

  confirmDelete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
