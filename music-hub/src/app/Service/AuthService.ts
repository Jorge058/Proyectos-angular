import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

export interface User {
  id: string;
  username: string;
  password: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = signal<string | null>(null);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';
  private router = inject(Router);

  private currentUser = signal<User | null>(null);

  login(username: string, password: string) {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', user.username);
          this.token.set(localStorage.getItem('token'));
          this.currentUser.set(user);
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    this.token.set(null);
    localStorage.clear();
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.token() !== null;
  }

  getToken(): string | null {
    return this.token();
  }

  getUser(): User | null {
    return this.currentUser();
  }
}
