import { DataService } from 'src/app/services/data.service';
import { User } from '../store/models/user.model';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  loggedUser = new BehaviorSubject<User | null>(null); // store the latest user

  login(user: User) {
    this.loggedUser.next(user);
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.router.navigate(['/home']);
  }
  logout() {
    this.loggedUser.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userInfo');
  }
  autoLogin() {
    const userInfo = localStorage.getItem('userInfo') as string;
    const user: User = JSON.parse(userInfo);
    console.log('auto login', user);
    if (!user) return;
    this.loggedUser.next(user);
    this.router.navigate(['/home']);
  }
}
