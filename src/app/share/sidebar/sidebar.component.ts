import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/NgrxGlobal/app.reducer';
import { IUsuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre: string = ''
  unSuscribe: Subscription;
  constructor(private rout: Router, private auth: AuthService,
    private store: Store<AppState>) {
    this.unSuscribe = Subscription.EMPTY;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.unSuscribe = this.store.select('user').pipe(filter(({ user }) => user !== null)).subscribe(({ user }) => this.nombre = user?.nombre ? user.nombre : '')
  }

  ngOnDestroy(): void {
    this.unSuscribe.unsubscribe()
  }
  cerrarSesion() {
    this.auth.closeSesion().then(signOut => {
      console.log(signOut)
      this.rout.navigate(['/login']);
    })
  }
}
