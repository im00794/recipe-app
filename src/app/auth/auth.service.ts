import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  singup(authForm: FormGroup) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYhTH4bJxD_WTL7x6fLs1ZjpHyagQDt-w',
      {
        email: authForm.get('email').value,
        password: authForm.get('password').value,
        returnSecureToken: true
      }).pipe(
      catchError(this.handleError),
      tap(response => this.handleAuthentication(response.email,
        response.localId,
        response.idToken,
        +response.expiresIn))
    );
  }

  login(authForm: FormGroup) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYhTH4bJxD_WTL7x6fLs1ZjpHyagQDt-w',
      {
        email: authForm.get('email').value,
        password: authForm.get('password').value,
        returnSecureToken: true
      }).pipe(
      catchError(this.handleError),
      tap(response => this.handleAuthentication(response.email,
        response.localId,
        response.idToken,
        +response.expiresIn))
    );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expiresIn = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expiresIn);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Could not login !';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS' :
        errorMessage = 'Email already provided !';
        break;
      case 'EMAIL_NOT_FOUND' :
        errorMessage = 'There is no user record corresponding to this identifier';
        break;
      case 'INVALID_PASSWORD' :
        errorMessage = 'Invalid password';
        break;
      case 'USER_DISABLED' :
        errorMessage = 'this account is suspended !';
    }
    return throwError(errorMessage);
  }

}
