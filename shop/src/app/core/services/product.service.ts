import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductModel } from '../../product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:3000/products';

  private readonly http = inject(HttpClient);

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl).pipe(
      tap(data => console.log('API DATA:', data)), // Başarılı log
      catchError(err => {
        console.error('API HATASI:', err); // Hata logu
        return of([]); // Fallback: boş dizi döner, app crash olmaz
      })
    );
  }
}
