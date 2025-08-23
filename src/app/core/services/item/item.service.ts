import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Item } from '../../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly apiUrl = `${environment.apiUrl}/items`; 

  constructor(private http: HttpClient) {}

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  getAllItem(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getById(itemId: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${itemId}`);
  }

  updateItem(itemId: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${itemId}`, item);
  }

  deleteItem(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`);
  }
}
