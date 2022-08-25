import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { SearchItemComponent } from './search-item/search-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InputComponent } from './input/input.component';
import { FormControlPipePipe } from './pipes/form-control-pipe.pipe';
import { AccountHttpInterceptor } from './account-http-interceptor';
import { SignOutComponent } from './sign-out/sign-out.component';
import { PaymentComponent } from './payment/payment.component';
import { CardComponent } from './card/card.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    ProductInfoComponent,
    SearchComponent,
    CartComponent,
    CartItemComponent,
    SearchItemComponent,
    SigninComponent,
    SignUpComponent,
    InputComponent,
    FormControlPipePipe,
    SignOutComponent,
    PaymentComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccountHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
