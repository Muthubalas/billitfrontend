import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInVar: boolean = false;
  helper=new JwtHelperService();
  constructor(private http:HttpClient) {

   }
   endpoint="https://marvelmanapakkam-backend.billitnow.in/"


  // login(email: string, password: string): Observable<any> {

  //   //  this.isLoggedInVar = true;
  //   const body = { email, password };
  //   return this.http.post(`${this.endpoint}/login`, body);
  // }

  // logout(): Observable<any> {
  //   return this.http.get(`${this.endpoint}/logout`);
  // }


  // getToken(): string | null {

  //   return localStorage.getItem('token');
  // }

  // clearToken(): void {

  //   this.isLoggedInVar = false;
  //   localStorage.removeItem('token');
  // }

  // isAuthenticated(): boolean {

  //   return !!this.getToken();
  // }
  // isLoggedIn(): boolean {

  //   const token = localStorage.getItem('token');
  //   return token!=null;
  //   // return !!token;
  // }
  // private token: string | null = null;



  // setToken(token: string) {
  //   this.token = token;
  //   localStorage.setItem('token', token);
  // }


  // removeToken() {
  //   // this.token = null;
  //   localStorage.removeItem('token');
  // }

  // getCurrentUser() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decodedToken = this.helper.decodeToken(token);
  //     return decodedToken;
  //   }
  //   return null;
  // }
  // getUserRole(): number {
  //   const token = this.getToken();
  //   if (token) {
  //     const decodedToken = this.helper.decodeToken(token);
  //     if (decodedToken && decodedToken.role) {
  //       // Assuming the role is stored as a number in the token
  //       return Number(decodedToken.role);
  //     }
  //   }
  //   return -1;
  // }



}
