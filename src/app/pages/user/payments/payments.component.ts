import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { Payment } from '../../../core/models/payment.model';
import { UserResponse } from '../../../core/models/login.model';
import { generatePDFReport } from '../../../core/helpers/pdf-helper';
import { getBase64Image } from '../../../core/helpers/image-helper';
import { AuthService } from '../../../core/services/auth/auth.service';

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
 userResponse: UserResponse | null = null;
  // Modal form models
  newPayment: Payment = {
    paymentId: '',
    customerName: '',
    status: 'Pending',
    invoiceNo: '',
    paymentDate: '',
    bankName: '',
    checkNo: '',
    clearingDate: '',
    userID: this.userResponse?.userId || ''
  };

  showModal: boolean = false;

  constructor(private paymentService: PaymentService, private authService: AuthService) {}

  ngOnInit(): void {
    // Load logged-in user
    this.userResponse = this.authService.getUser();

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
        console.log('Payment created successfully:', this.payments);
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
      customerName: '',
      status: 'Pending',
      invoiceNo: '',
      paymentDate: '',
      bankName: '',
      checkNo: '',
      clearingDate: '',
      userID: this.userResponse?.userId || ''
    };
  }

  // generatePaymentsReport() {
  //   if (!this.userResponse) {
  //     console.error('User info not available');
  //     return;
  //   }

  //   const tableData = this.filteredPayments.map(p => ({
  //     Status: p.status,
  //     'Invoice No': p.invoiceNo,
  //     'Payment Date': p.paymentDate,
  //     'Bank Name': p.bankName,
  //     'Check No': p.checkNo,
  //     'Clearing Date': p.clearingDate
  //   }));

  //   const headers = ['Status', 'Invoice No', 'Payment Date', 'Bank Name', 'Check No', 'Clearing Date'];

  //   getBase64Image('assets/images/logo-merrymart.png').then(logoBase64 => {
  //     generatePDFReport(tableData, headers, 'Payments Report', this.userResponse!, logoBase64);
  //   }).catch(err => {
  //     console.error('Error loading logo:', err);
  //     generatePDFReport(tableData, headers, 'Payments Report', this.userResponse!);
  //   });
  // }
}
