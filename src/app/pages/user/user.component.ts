import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  isSidebarOpen = false;
  constructor(private router: Router) { }

    logout() {
    localStorage.removeItem('user'); // clear session
    this.router.navigate(['/login']); // redirect to login
  }
}
