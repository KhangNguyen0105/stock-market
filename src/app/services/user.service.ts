import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  
  // BehaviorSubject để lưu trạng thái người dùng
  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser$ = this.userSubject.asObservable();
  
  constructor(private http: HttpClient) { }
  
  getUserFromStorage(): any {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || 'null');
    }
    return null;
  }

  login(email: string, password: string) {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage
          this.userSubject.next(user); // Update BehaviorSubject with the new user
          return user;
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw new Error('Unable to login. Please try again later.');
      })
    );
  }

  getUser(): any {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null;
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
    }
    this.userSubject.next(null); // Update BehaviorSubject to null on logout
  }

  register(user: any) {
    return this.http.post<any>('http://localhost:3000/users', user);
  }
}
