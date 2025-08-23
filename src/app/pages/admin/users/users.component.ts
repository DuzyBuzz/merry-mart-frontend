import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { Users } from '../../../core/models/users.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Users[] = [];          // All users from backend
  filteredUsers: Users[] = [];  // Filtered users based on search
  searchTerm: string = '';       // Search input

  showModal: boolean = false;    // Control modal visibility
  editingUser: boolean = false;  // Flag for edit mode
  currentUser: Users = new Users(); // Object bound to form

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // Load all users on component init
  }

  // Load users from backend
  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.filteredUsers = res;
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  // Filter users by search term
  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.userName.toLowerCase().includes(term) ||
      (user.position?.toLowerCase().includes(term)) ||
      (user.role?.toLowerCase().includes(term))
    );
  }

  // Open modal for creating new user
  createUser() {
    this.editingUser = false;
    this.currentUser = new Users();
    this.showModal = true;
  }

  // Open modal for editing user
  editUser(user: Users) {
    this.editingUser = true;
    this.currentUser = { ...user }; 
    this.showModal = true;
  }

  // Close modal
  closeModal() {
    this.showModal = false;
  }

  // Submit user form
  submitUser() {
    if (this.editingUser) {
      this.userService.updateUser(this.currentUser).subscribe({
        next: () => {
          this.loadUsers();
          this.showModal = false;
        },
        error: (err) => console.error('Error updating user:', err)
      });
    } else {
      this.userService.createUser(this.currentUser).subscribe({
        next: () => {
          this.loadUsers();
          this.showModal = false;
        },
        error: (err) => console.error('Error creating user:', err)
      });
    }
  }

  // Delete user
  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user:', err)
      });
    }
  }

}
