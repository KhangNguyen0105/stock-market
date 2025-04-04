import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'user'; // mặc định là user
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin.';
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.userService.register(newUser).subscribe({
      next: () => {
        this.successMessage = 'Đăng ký thành công! Đang chuyển hướng đến đăng nhập...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        this.errorMessage = err.message || 'Đăng ký thất bại!';
      }
    });
  }
}
