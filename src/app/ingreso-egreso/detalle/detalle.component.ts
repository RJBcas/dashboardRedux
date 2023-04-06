import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IIngresosEgresos, IngresosEgresos } from 'src/app/models/ingresos-egresos.model';
import { AppState } from 'src/app/NgrxGlobal/app.reducer';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso/ingreso-egreso.service';
import * as uiActions from 'src/app/share/NgRxjs/ui.actions';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  private unSubs: Subscription;
  ingresosEgresos: IIngresosEgresos[] = []
  constructor(private store: Store<AppState>, private ingresosEgresosS: IngresoEgresoService) {
    this.unSubs = Subscription.EMPTY;

  }
  ngOnInit(): void {
    this.unSubs = this.store.select('ingresosEgresos').subscribe((items: any) => this.ingresosEgresos = items.items)
  }
  ngOnDestroy(): void {
    this.unSubs.unsubscribe()
  }
  borrar(uid: string) {
    this.store.dispatch(uiActions.isLoading())

    this.ingresosEgresosS.borrarItem(uid)
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Ingreso o Egreso Borrado'
        })
        this.store.dispatch(uiActions.stopLoadin())
      }).catch(err => {
        Swal.hideLoading()
        Swal.fire({
          icon: 'error',
          title: 'A ocurrido un error',
          text: 'No se pudo eliminar el ingreso o el egreso'
        })
        this.store.dispatch(uiActions.stopLoadin())

      })
  }
}
