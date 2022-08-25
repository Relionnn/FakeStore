import { Component, OnInit } from '@angular/core';
import { Product } from '../Interfaces/product.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = new Map<number, Product>();
  totalPrice: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getItems();
    this.productService.getPersistedItems();
  }

  private getItems(): void {
    this.productService.items$.subscribe((products: Product[]) => {
      const newProducts = new Map();
      this.totalPrice = 0;

      products.forEach((product: Product) => {
        newProducts.set(product.id, product);

        this.totalPrice += product.quantity * product.price;
      });

      this.items = newProducts;
    });
  }

  clearCart() {
    this.items = new Map();
  }
}
