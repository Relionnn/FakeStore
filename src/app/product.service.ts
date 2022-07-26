import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from './Interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  items: CartItem[] = [];
  items$: BehaviorSubject<CartItem[]> = new BehaviorSubject(this.items);

  url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProduct(id: number): Observable<Product> {
    const urlNew = `${this.url}/${id}`;
    return this.http.get<Product>(urlNew);
  }

  addToCart(item: CartItem) {
    if (!item.quantity) {
      item.quantity = 1;
      this.items.push(item);
    } else {
      const productIndex = this.items.findIndex(
        (product) => item.id === product.id
      );
      this.items[productIndex].quantity++;
    }

    this.propagateChanges();
    // window.alert('Your product has been added to the cart!');
  }

  getItems() {
    return this.items;
  }

  removeItem(productId: number): void {
    const productIndex = this.items.findIndex(
      (product: CartItem) => product.id === productId
    );

    if (this.items[productIndex].quantity === 1) {
      this.items.splice(productIndex, 1);
    } else {
      this.items[productIndex].quantity--;
    }

    this.propagateChanges();
  }

  removeAllItems(productId: number): void {
    this.items = this.items.filter(
      (product: CartItem) => product.id !== productId
    );

    this.propagateChanges();
  }

  propagateChanges(): void {
    this.items$.next(this.items);
    localStorage.setItem('cart', JSON.stringify([...this.items.values()]));
  }

  getPersistedItems(): void {
    const persistedItems: Product[] = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

    this.items = persistedItems;
    this.items$.next(this.items);
  }
}
