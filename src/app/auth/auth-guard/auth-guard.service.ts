import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    Router
} from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private authService: AuthService) {}
    /**
     * Check permission admin permission
     * @param next handle next state
     * @param state handle current state
     */
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authCheck();
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authCheck();
    }

    authCheck(): boolean {
        if (this.authService.getUserInfo()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
