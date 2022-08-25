import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  url = 'https://secure.snd.payu.com/';

  constructor(private http: HttpClient) {}

  newOrder() {
    return this.http.post<any>('https://secure.snd.payu.com/api/v2_1/orders', {
      notifyUrl: 'https://your.eshop.com/notify',
      customerIp: '127.0.0.1',
      merchantPosId: '145227',
      description: 'RTV market',
      currencyCode: 'PLN',
      totalAmount: '15000',
      extOrderId: 'ruvkjk7wljbn8yxrk6bqlg',
      buyer: {
        email: 'john.doe@example.com',
        phone: '654111654',
        firstName: 'John',
        lastName: 'Doe',
      },
      products: [
        {
          name: 'Wireless Mouse for Laptop',
          unitPrice: '15000',
          quantity: '1',
        },
      ],
    });
  }
}
