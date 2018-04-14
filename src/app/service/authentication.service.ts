import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    private loggedIn = new BehaviorSubject<boolean>(false); // {1}

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    get isLoggedIn() {
        return this.loggedIn.asObservable(); // {2}
    }

    login(email: string, password: string) {
        return this.http.post<any>(
            'http://localhost:3001/api/auth/login', 
            'email=' + email + '&password=' + password + '&workspace=DevTeam', 
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        ).map(res => {
            // login successful if there's a jwt token in the response
            if(res.message !== 'error'){
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.loggedIn.next(true);
                localStorage.setItem('currentUser', JSON.stringify(res.message));
            }
            return res;
        });
    }

    register(username: string, email: string, password: string) {
        return this.http.post<any>(
            'http://localhost:3001/api/auth/register', 
            'username=' + username + '&email=' + email + '&password=' + password + '&workspace=DevTeam', 
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        ).map(res => {
            // login successful if there's a jwt token in the response
            if(res.message !== 'exist'){
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.loggedIn.next(true);
                localStorage.setItem('currentUser', JSON.stringify(res.message));
            }
            return res;
        });
    }

    logout() {
        // remove user from local storage to log user out
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    getUser() {
        return localStorage.getItem('currentUser')
    }
}