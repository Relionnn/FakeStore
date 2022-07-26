import { Component, OnInit } from '@angular/core';
import { Product } from '../Interfaces/product.interface';
import { Buttons, Status } from '../Interfaces/status.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filteredDownPrice: Product[] = [];
  filteredUpPrice: Product[] = [];
  filteredProductsByCategory: Product[] = [];
  buttons = Buttons;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    this.resetButtons();
  }

  resetButtons() {
    for (let i = 1; i < this.buttons.length; i++) {
      this.buttons[i].active = false;
      this.buttons[i].class = 'btn btn-outline-light me-2';
    }
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products =
        this.filteredProducts =
        this.filteredDownPrice =
        this.filteredUpPrice =
        this.filteredProductsByCategory =
          data;
    });
  }

  changeStatus(currentButton: Status) {
    let buttonIndex = this.buttons.findIndex(
      (button: Status) => currentButton.category === button.category
    );
    if (!this.buttons[buttonIndex].active) {
      for (let i = 0; i < this.buttons.length; i++) {
        if (i === buttonIndex) {
          this.buttons[buttonIndex].active = true;
          this.buttons[buttonIndex].class = 'btn btn-outline-light me-2 xd';
        } else {
          this.buttons[i].active = false;
          this.buttons[i].class = 'btn btn-outline-light me-2';
        }
      }
      this.filterProductsByCategory(currentButton);
    }
  }

  filterProductsByCategory(currentButton: Status) {
    if (this.buttons[0].active) {
      this.filteredProductsByCategory = this.products;
    } else {
      this.filteredProductsByCategory = this.products.filter(
        (product: Product) =>
          currentButton.category.toLowerCase() ===
          product.category.toLowerCase()
      );
    }
    this.allFilteredProducts();
  }

  filterProductsByDownPriceRange(event: Event) {
    const query: any = (event.target as HTMLInputElement)?.value;
    if (!query) {
      this.filteredDownPrice = this.products;
      return;
    }
    this.filteredDownPrice = this.products.filter(
      (product: Product) => product.price >= query
    );
    this.allFilteredProducts();
  }
  filterProductsByUpPriceRange(event: Event) {
    const query: any = (event.target as HTMLInputElement)?.value;
    if (!query) {
      this.filteredUpPrice = this.products;
      return;
    }
    this.filteredUpPrice = this.products.filter(
      (product: Product) => product.price <= query
    );
    this.allFilteredProducts();
  }

  allFilteredProducts() {
    let filteredPrice = this.filteredDownPrice.filter((o1) =>
      this.filteredUpPrice.some((o2) => o1.id === o2.id)
    );
    this.filteredProducts = filteredPrice.filter((o1) =>
      this.filteredProductsByCategory.some((o2) => o1.id === o2.id)
    );
    console.log(this.filteredProducts);
  }

  sortBy(event: Event) {
    if ((event.target as HTMLInputElement).value === 'PriceUp') {
      return this.filteredProducts.sort((low, high) => low.price - high.price);
    } else if ((event.target as HTMLInputElement).value === 'PriceDown') {
      return this.filteredProducts.sort((low, high) => high.price - low.price);
    } else if ((event.target as HTMLInputElement).value === 'Alfabetical') {
      return this.filteredProducts.sort(function (low, high) {
        return low.title.localeCompare(high.title);
      });
    } else {
      return this.filteredProducts;
    }
  }
}
