import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductAddForms2Component } from './product/product-add-forms2.component/product-add-forms2.component';
import { ProductAddForms1 } from './product/product-add-forms1/product-add-forms1';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/login.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'product-add-1', component: ProductAddForms1, canActivate: [AuthGuard] },
  { path: 'product-add-2', component: ProductAddForms2Component, canActivate: [AuthGuard] },
  { path: 'products', component: ProductComponent },
  { path: 'products/category/:id', component: ProductComponent },
  { path: 'login', component: LoginComponent },
];
