import { HttpClient } from '@angular/common/http';
import { HostListener, inject, Injectable, model } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, filter, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  posts: any[] = [];
  private baseUrl = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {}
  private router = inject(Router); // ✅ استخدام inject() بدلاً من constructor

  getpost(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getDetailspost(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching product:', error);
        return throwError(() => new Error('Failed to fetch product details'));
      })
    );
  }
  // =======================================================================================================
  // =======================================================================================================

  getallcategory(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`).pipe(
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return throwError(() => new Error('Failed to fetch categories'));
      })
    );
  }
  // =======================================================================================================
  // =======================================================================================================

  createnewproduct( model : any) {
    return this.http.post('https://fakestoreapi.com/carts' , model );
  }

  // =======================================================================================================
  // =======================================================================================================

  getproductByCategory(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${keyword}`).pipe(
      catchError((error) => {
        console.error('Error fetching products by category:', error);
        return throwError(() => new Error('Failed to fetch products'));
      })
    );
  }
  // =======================================================================================================
  // =======================================================================================================

  // to back  scroll on top
  backToTop() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // ✅ تحسين الأداء
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
  // =======================================================================================================
  // =======================================================================================================
}
