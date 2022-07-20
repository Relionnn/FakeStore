import { Component, OnInit } from '@angular/core';
import { Product } from '../iproducts';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe((data) => (this.products = data));
  }
  ngOnInit(): void {
    this.getProducts();
  }
}
