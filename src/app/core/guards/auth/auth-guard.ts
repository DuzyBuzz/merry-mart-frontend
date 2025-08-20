import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getUser();

  //if there is no user
  if(!user){
    //back to login
    router.navigate(['/login']);
    return false;
    
  }

  return true; // correct user role
};
