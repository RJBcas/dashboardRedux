import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private rout: Router) {

  }
  canActivate(): Observable<boolean> {

    return this.auth.isAuth().pipe(
      tap(estado => {
        if (!estado) { this.rout.navigate(['/login']) }
      })
    );
  }

}
