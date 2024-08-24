import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN)!;
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER)!);
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user) {
      return user.id;
    }

    return '';
  }

  static getuserRole(): string {
    const user = this.getUser();
    if (user) {
      return user.role;
    }

    return '';
  }

  static isAdminLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    }

    const role = this.getuserRole();
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    }

    const role = this.getuserRole();
    return role === 'CUSTOMER';
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
