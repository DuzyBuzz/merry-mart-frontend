import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Expense } from '../../models/expenses.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
    // Base URL of your API from environment.ts
  private baseUrl = `${environment.apiUrl}/expenses`;

  constructor(private http: HttpClient) {}

//CRUD
  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.baseUrl, expense);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseUrl);
  }

  getExpenseById(expenseId: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.baseUrl}/${expenseId}`);
  }

  updateExpense(expenseId: string, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.baseUrl}/${expenseId}`, expense);
  }

  deleteExpense(expenseId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${expenseId}`);
  }}