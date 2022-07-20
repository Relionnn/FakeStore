import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../iproducts';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() item: Product;
  quantity = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  removeItem() {
    let currentItem = this.item;
    this.productService.removeItem(currentItem);
  }

  quantityUp() {
    return this.quantity++;
  }

  quantityDown() {
    if (this.quantity >= 2) {
      return this.quantity--;
    } else {
      return this.removeItem();
    }
  }
}
