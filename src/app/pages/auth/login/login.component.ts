import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginRequest } from '../../../core/models/login.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component
({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userName = '';
  password = '';
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router)
  {
  }
  
  login(){
    const request: LoginRequest = 
    {
     userName: this.userName, 
    password: this.password
    };
    this.authService.login(request).subscribe({
      next: (user) => {
        this.authService.setUser(user);
        if(user.role === 'admin'){
          this.router.navigate(['/admin']);
        }
        else{
          this.router.navigate(['/user']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid credentials';
      }
    })
  }
  

}
