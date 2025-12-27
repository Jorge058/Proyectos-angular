import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../Service/AuthService';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.isAuthenticated()){
    return true;
  }else{
    router.navigate(['/login']);
    return false
  }
};
