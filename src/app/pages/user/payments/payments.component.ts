import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { Payment } from '../../../core/models/payment.model';
import { UserResponse } from '../../../core/models/login.model';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {

  payments: Payment[] = [];        // All payments from backend
  filteredPayments: Payment[] = []; // Payments filtered by search/date
  searchTerm: string = '';         // Search input model
  userResponse: UserResponse[] = [];
  // Modal form models
  newPayment: Payment = {
    paymentId: '',
    status: 'Pending',
    invoiceNo: '',
    paymentDate: '',
    bankName: '',
    checkNo: '',
    clearingDate: '',
    userID: this.userResponse[0]?.userId || ''
  };

  showModal: boolean = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  // Load payments from backend
  loadPayments(): void {
    this.paymentService.getPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.filteredPayments = data;
      },
      error: (err) => console.error('Error fetching payments:', err)
    });
  }

  // Search filter
  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPayments = this.payments.filter(p =>
      p.invoiceNo.toLowerCase().includes(term) ||
      p.status.toLowerCase().includes(term) ||
      p.bankName.toLowerCase().includes(term)
    );
  }

  // Submit new payment
  submitPayment(): void {
    this.paymentService.createPayment(this.newPayment).subscribe({
      next: (payment) => {
        this.payments.push(payment);
        this.filteredPayments = this.payments;
        this.resetForm();
        this.showModal = false;
      },
      error: (err) => console.error('Error creating payment:', err)
    });
  }

  // Delete payment
  deletePayment(paymentId: string) {
    if (!confirm('Are you sure you want to delete this payment?')) {
      return;
    }

    this.paymentService.deletePayment(paymentId).subscribe({
      next: () => {
        console.log(`Payment ${paymentId} deleted successfully`);
        this.payments = this.payments.filter(p => p.paymentId !== paymentId);
        this.filteredPayments = this.filteredPayments.filter(p => p.paymentId !== paymentId);
      },
      error: (err) => {
        console.error('Error deleting payment:', err);
      }
    });
  }


  // Reset form
  resetForm(): void {
    this.newPayment = {
      paymentId: '',
      status: 'Pending',
      invoiceNo: '',
      paymentDate: '',
      bankName: '',
      checkNo: '',
      clearingDate: '',
      userID: this.userResponse[0]?.userId || ''
    };
  }
}
