import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../core/models/customer.model';
import { CustomersService } from '../../../core/services/customers/customers.service';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];        // all customers
  filteredCustomers: Customer[] = []; // filtered customers (search)
  searchTerm: string = '';           // search input
  showModal: boolean = false;        // modal visibility

  // New customer form model
  newCustomer: Customer = {
    customerId: 0,
    customerName: '',
    customerBranchName: ''
  };

  constructor(
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // Fetch all customers from backend
  loadCustomers(): void {
    this.customersService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = data;
      },
      error: (err) => console.error('Error fetching customers:', err)
    });
  }

  // Search customers by name or branch
  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter(c =>
      c.customerName.toLowerCase().includes(term) ||
      c.customerBranchName.toLowerCase().includes(term)
    );
  }

  // Create new customer
  submitCustomer(): void {
    if (!this.newCustomer.customerName || !this.newCustomer.customerBranchName) {
      alert('Please fill in all fields before saving.');
      return;
    }

    this.customersService.createCustomer(this.newCustomer).subscribe({
      next: (customer) => {
        this.customers.push(customer);
        this.filteredCustomers = [...this.customers]; // refresh
        this.resetCustomerForm();
        this.showModal = false;
      },
      error: (err) => console.error('Error creating customer:', err)
    });
  }

  // Delete customer
  deleteCustomer(customerId: number): void {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.customersService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.customers = this.customers.filter(c => c.customerId !== customerId);
        this.filteredCustomers = [...this.customers];
      },
      error: (err) => console.error('Error deleting customer:', err)
    });
  }

  // Reset form after submit
  resetCustomerForm(): void {
    this.newCustomer = {
      customerId: 0,
      customerName: '',
      customerBranchName: ''
    };
    this.showModal = false;
  }
}
