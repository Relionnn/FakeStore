import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { SigninComponent } from './sign-in/sign-in.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { SearchComponent } from './search/search.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountGuard } from './account.guard';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'product-info/:id', component: ProductInfoComponent },
  { path: 'products', component: SearchComponent },
  { path: 'sign-in', canActivate: [AccountGuard], component: SigninComponent },
  { path: 'sign-up', canActivate: [AccountGuard], component: SignUpComponent },
  { path: 'sign-out', component: SignOutComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
