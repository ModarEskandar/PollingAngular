import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { User } from '../store/models/user.model';
import { Store } from '@ngrx/store';
import { alertMsg, resetMsg } from '../store/actions/alert.action';
import { AlertService } from '../services/alert.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  appTitle = 'Polling';
  authedUser: string = '';
  avatarUrl: string = '';
  private userSub!: Subscription;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub = this.authService.loggedUser.subscribe(
      (user: User | null) => {
        this.isAuthenticated = !!user;
        console.log('app header on init', !!user);
        this.isAuthenticated = !!user;
        this.authedUser = user?.name as string;
        this.avatarUrl = user?.avatarURL as string;
      }
    );
  }
  onLogout() {
    this.snackBar.open('Logged out successfully', undefined, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['green-snackbar'],
    });
    this.authService.logout();
  }
}
