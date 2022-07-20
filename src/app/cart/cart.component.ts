import { Component, OnInit } from '@angular/core';
import { Product } from '../iproducts';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = new Map<number, Product>();
  totalPrice: number = 0;
  quantity: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getItems();
    console.log(this.quantity);
    this.getTotalPrice();
  }

  private getItems(): void {
    this.productService.items$.subscribe((products: Product[]) => {
      const newProducts = new Map();

      products.forEach((product: Product) => {
        newProducts.set(product.id, product);
      });

      this.items = newProducts;
    });
  }

  clearCart() {
    this.items = new Map();
  }

  getTotalPrice() {
    this.items.forEach((item) => {
      this.totalPrice += item.price * this.quantity;
    });
  }
}

// ngOnInit(): void {
//   const persistedItems: Product[] = JSON.parse(
//     localStorage.getItem('cart') || ''
//   );
//   let itemsToMap: Product[];

//   if (persistedItems.length) {
//     itemsToMap = persistedItems;
//   } else {
//     itemsToMap = this.productService.getItems();
//   }

//   itemsToMap.forEach((product: Product) => {
//     this.items.set(product.id, product);
//   });

//   localStorage.setItem('cart', JSON.stringify([...this.items.values()]));
// }
