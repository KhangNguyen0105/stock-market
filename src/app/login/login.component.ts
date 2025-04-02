import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  login(): void {
    this.userService.login(this.email, this.password).subscribe({
      next: (user) => {
        console.log('Login successful:', user);
        this.router.navigate(['/stock-list']); // Navigate to stock-list on successful login
      },
      error: err => {
        console.error('Login failed:', err);
        this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng';
      }
    });
  }
}
