import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: any;

  constructor(private userService: UserService, private router: Router) {  }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
    });  
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
