import { Component, inject, OnInit, signal } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDialogComponent } from '../../productActions/components/ProductEditDialogComponent/ProductEditDialogComponent';
import { ProductAddDialogComponent } from '../../productActions/components/ProductAddDialogComponent/ProductAddDialogComponent';
import { ProductDeleteDialogComponent } from '../../productActions/components/ProductDeleteDialogComponent/ProductDeleteDialogComponent';

@Component({
  selector: 'app-products-component',
  imports: [],
  templateUrl: './productsComponent.html',
  styleUrl: './productsComponent.css',
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  productService = inject(ProductService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => this.products.set(data));
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductAddDialogComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe((product) => {
      if (product) {
        this.productService.addProduct(product).subscribe(() => this.loadProducts());
      }
    });
  }

  updateProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      width: '400px',
      data: product ,
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.productService.updateProduct(result).subscribe(() => this.loadProducts());
      }
    });
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent, {
      width: '350px',
      data: product,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.productService.deleteProduct(product.id!).subscribe(() => this.loadProducts());
      }
    });
  }
}
