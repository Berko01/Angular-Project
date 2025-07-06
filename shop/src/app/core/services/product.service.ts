import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductModel } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:3000/products';

  private readonly http = inject(HttpClient);

getProducts(categoryId?: string): Observable<ProductModel[]> {
  let url = this.apiUrl;

  if (categoryId) {
    url += `?categoryID=${categoryId}`; // Büyük D harfli ID!
  }

  return this.http.get<ProductModel[]>(url).pipe(
    tap(data => console.log('API DATA:', data)),
    catchError(err => {
      console.error('API HATASI:', err);
      return of([]);
    })
  );
}


}
