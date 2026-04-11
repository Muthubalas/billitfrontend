import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
interface RouteConfig {
  [key: string]: number;
  // Define other routes and their required roles here
  // For example:
  // 'customer': 1,
  // 'admin': 2,
}
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private data: DataService, private router: Router) {}

  // canActivate(): boolean {
  //   if (this.authService.isLoggedIn()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.data.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles: number[] = route.data['expectedRoles'] || [];

    const userRole = this.data.getUserRole();
    if (expectedRoles.length > 0 && !expectedRoles.includes(userRole)) {
      // User does not have the necessary role for this route
      this.router.navigate(['/unauthorized']); // Or any other appropriate route
      return false;
    }

    return true;
  }

}
