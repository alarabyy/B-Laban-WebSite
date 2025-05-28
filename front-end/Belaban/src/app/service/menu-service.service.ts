import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../interfaces/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'https://localhost:7183/api/MenuItems';

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }
    addMenuItem(formData: FormData): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.apiUrl, formData);
  }
  updateMenuItem(item: MenuItem): Observable<MenuItem> {
  return this.http.put<MenuItem>(`${this.apiUrl}/${item.id}`, item);
}

deleteMenuItem(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}
