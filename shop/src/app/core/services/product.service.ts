import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductModel } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:3000/products';

  private readonly http = inject(HttpClient);

  /**
   * Ürünleri getirir. Opsiyonel kategori ID ile filtrelenebilir.
   */
  getProducts(categoryId?: string): Observable<ProductModel[]> {
    let url = this.apiUrl;

    if (categoryId) {
      url += `?categoryID=${categoryId}`;
    }

    return this.http.get<ProductModel[]>(url).pipe(
      tap(data => console.log('[ProductService] GET Products:', data)),
      catchError(err => {
        console.error('[ProductService] GET Error:', err);
        return of([]);
      })
    );
  }

  /**
   * Yeni ürün ekler.
   */
  addProduct(product: ProductModel): Observable<ProductModel | null> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };

    return this.http.post<ProductModel>(this.apiUrl, product, httpOptions).pipe(
      tap(data => console.log('[ProductService] POST Product:', data)),
      catchError(err => {
        console.error('[ProductService] POST Error:', err);
        return of(null); // ✅ Tek ürün döndüğü için null dönmek doğru
      })
    );
  }
}
