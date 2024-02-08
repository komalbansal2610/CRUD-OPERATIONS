import { CanActivateFn,Router,RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { LocalService } from 'src/app/local.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const localStorage=inject(LocalService);
  const router=inject(Router);
  const token = localStorage.getData('token');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
