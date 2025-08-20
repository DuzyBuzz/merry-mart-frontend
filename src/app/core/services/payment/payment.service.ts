// src/app/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Payment } from '../../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // Base URL of your API from environment.ts
  private baseUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

//CRUD
  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.baseUrl, payment);
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.baseUrl);
  }

  getPaymentById(paymentId: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/${paymentId}`);
  }

  updatePayment(paymentId: string, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/${paymentId }`, payment);
  }

  deletePayment(paymentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${paymentId}`);
  }
}
