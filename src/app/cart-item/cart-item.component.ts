import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../Interfaces/product.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  removeItem() {
    this.productService.removeAllItems(this.item.id);
  }

  quantityUp() {
    this.productService.addToCart(this.item);
  }

  quantityDown() {
    this.productService.removeItem(this.item.id);
  }
}
