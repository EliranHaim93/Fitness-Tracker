import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data';
import { User } from './user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { TrainingrService } from '../training/training.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingrService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {})
      .catch((err) => console.log(err));
  }

  login(authData: AuthData) {
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  logout() {
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
