import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Users } from '../../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  // Get all users
  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl);
  }

  // Create user
  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.baseUrl, user);
  }

  // Update user
  updateUser(user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.baseUrl}/${user.userId}`, user);
  }

  // Delete user
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }

}
