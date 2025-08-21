import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ExpensesService } from '../../../core/services/expenses/expenses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../../core/models/expenses.model';

@Component({
  selector: 'app-expenses',
  standalone: true,   // Angular 19 uses standalone components
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {

  expenses: Expense[] = [];        // All expenses from backend
  filteredExpenses: Expense[] = []; // Expenses filtered by search
  searchTerm: string = '';         

  // Modal form model
  newExpense: Expense = {
    expensesId: '',
    expensesDate: '',
    voucherNo: '',
    checkNo: '',
    birReceiptNo: '',
    expensesCategory: '',
    businessName: '',
    applicationDate: '',
    tinNo: '',
    address: '',
    expensesAmount: '',
    vatAmount: '',
    customerName: ''
  };

  showModal: boolean = false;

  constructor(private expenseService: ExpensesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  // Load all expenses
  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.filteredExpenses = data;
      },
      error: (err) => console.error('Error fetching expenses:', err)
    });
  }

  // Search filter (by customerName or businessName)
  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredExpenses = this.expenses.filter(e =>
      e.customerName.toLowerCase().includes(term) ||
      e.businessName.toLowerCase().includes(term) ||
      e.expensesCategory.toLowerCase().includes(term)
    );
  }

  // Submit new expense
  submitExpense(): void {
    this.expenseService.createExpense(this.newExpense).subscribe({
      next: (expense) => {
        this.expenses.push(expense);
        this.filteredExpenses = this.expenses;
        this.resetForm();
        this.showModal = false;
        console.log('Expense created successfully:', this.expenses);
      },
      error: (err) => console.error('Error creating expense:', err)
    });
  }

  // Delete expense
  deleteExpense(expensesId: string) {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    this.expenseService.deleteExpense(expensesId).subscribe({
      next: () => {
        console.log(`Expense ${expensesId} deleted successfully`);
        this.expenses = this.expenses.filter(e => e.expensesId !== expensesId);
        this.filteredExpenses = this.filteredExpenses.filter(e => e.expensesId !== expensesId);
      },
      error: (err) => {
        console.error('Error deleting expense:', err);
      }
    });
  }

  // Reset form
  resetForm(): void {
    this.newExpense = {
      expensesId: '',
      expensesDate: '',
      voucherNo: '',
      checkNo: '',
      birReceiptNo: '',
      expensesCategory: '',
      businessName: '',
      applicationDate: '',
      tinNo: '',
      address: '',
      expensesAmount: '',
      vatAmount: '',
      customerName: ''
    };
  }
}
