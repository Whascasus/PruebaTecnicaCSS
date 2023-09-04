import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from './Services/login.service';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);

  return loginService.isAuthenticated().pipe(
    map((status) => {
      console.log(status);
      if (status) {
        return true
      }

      return router.createUrlTree(['/login']);
    })
  );
};