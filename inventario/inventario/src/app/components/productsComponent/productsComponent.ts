import { Component, inject, OnInit, signal } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-component',
  imports: [],
  templateUrl: './productsComponent.html',
  styleUrl: './productsComponent.css',
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  productService = inject(ProductService);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => this.products.set(data));
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe(() => this.loadProducts());
  }
  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe(() => this.loadProducts());
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}
