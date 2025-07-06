import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Category } from '../../category/category.model';  // Kendi modeline göre yolu düzenle

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = 'http://localhost:3000/categories';

  private readonly http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      tap(data => console.log('CATEGORY API DATA:', data)), // Başarılı log
      catchError(err => {
        console.error('CATEGORY API HATASI:', err); // Hata logu
        return of([]); // Fallback: boş dizi döner, app crash olmaz
      })
    );
  }
}
