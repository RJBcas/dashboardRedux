import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../NgrxGlobal/app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso/ingreso-egreso.service';

import * as ingresosEActions from '../ingreso-egreso/ngrxjs/ingresoEgreso.actions';
import { IngresosEgresos } from '../models/ingresos-egresos.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private userUnSuscribe$: Subscription;
  private ingresosSubs$: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoS: IngresoEgresoService) {
    this.userUnSuscribe$ = Subscription.EMPTY;
    this.ingresosSubs$ = Subscription.EMPTY;


  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userUnSuscribe$ = this.store.select('user')
      .pipe(
        filter(user => user.user !== null)).subscribe(({ user }) => {
          if (user?.uid) {
            this.ingresosSubs$ = this.ingresoEgresoS.initIngresosEgresosListener(user.uid)
              .subscribe((ingresosEgresos: any) => {
                this.store.dispatch(ingresosEActions.setItem({ items: ingresosEgresos }))
              })
          }
        })
  }

  ngOnDestroy(): void {

    this.userUnSuscribe$.unsubscribe()
    this.ingresosSubs$.unsubscribe()

  }
}
