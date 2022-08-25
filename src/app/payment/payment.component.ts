import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormControl } from '../date-form-control';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  maskNumber: string = '0000 0000 0000 0000';
  maskSecurity: string = '000';
  cardForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(16),
      Validators.minLength(16),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    expiration: new DateFormControl('', [
      Validators.required,
      Validators.maxLength(5),
      Validators.minLength(5),
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
    ]),
    securityCode: new FormControl('', [Validators.required]),
  });

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.paymentService.newOrder().subscribe();
  }

  onResetClick() {
    this.cardForm.reset();
  }
}
