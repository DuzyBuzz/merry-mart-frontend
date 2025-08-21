import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isSidebarOpen = false;
  constructor(private router: Router) { }

    logout() {
    localStorage.removeItem('user'); // clear session
    this.router.navigate(['/login']); // redirect to login
  }
}
