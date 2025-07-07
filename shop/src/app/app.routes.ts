import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductAddForms2Component } from './product/product-add-forms2.component/product-add-forms2.component';
import { ProductAddForms1 } from './product/product-add-forms1/product-add-forms1';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'product-add-1', component: ProductAddForms1 },
  { path: 'product-add-2', component: ProductAddForms2Component  },
  { path: 'products', component: ProductComponent },
  { path: 'products/category/:id', component: ProductComponent },
];

