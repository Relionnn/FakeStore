import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Product } from './iproducts';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  items: Product[] = [];
  items$: BehaviorSubject<Product[]> = new BehaviorSubject(this.items);

  url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProduct(id: number): Observable<Product> {
    const urlNew = `${this.url}/${id}`;
    return this.http.get<Product>(urlNew);
  }

  addToCart(product: Product) {
    this.items.push(product);
    window.alert('Your product has been added to the cart!');
  }

  getItems() {
    return this.items;
  }

  removeItem(currentItem: Product) {
    this.items = this.items.filter(
      (itemsToFilter) => itemsToFilter.title !== currentItem.title
    );

    this.items$.next(this.items);
  }
}
