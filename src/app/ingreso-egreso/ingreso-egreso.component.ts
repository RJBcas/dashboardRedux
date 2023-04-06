import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { IngresosEgresos } from '../models/ingresos-egresos.model';
import { AppState } from '../NgrxGlobal/app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso/ingreso-egreso.service';
import * as uiActions from '../share/NgRxjs/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  formIE: FormGroup;
  tipo: string = 'ingreso'
  cargando: boolean = false;
  loadingSuscription$: Subscription;
  constructor(private fb: FormBuilder, private ingresoES: IngresoEgresoService, private store: Store<AppState>) {
    this.formIE = this.fb.group({
      descripcion: ['', [Validators.required]],
      monto: [0, [Validators.required, Validators.min(1)]],

    })
    this.loadingSuscription$ = Subscription.EMPTY;
  }
  ngOnInit(): void {
    this.loadingSuscription$ = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)
  }
  ngOnDestroy(): void {
    this.loadingSuscription$.unsubscribe()
  }

  guardar() {
    this.store.dispatch(uiActions.isLoading())


    const { descripcion, monto } = this.formIE.value;
    const ingresoEgreso = new IngresosEgresos(descripcion, monto, this.tipo)
    this.ingresoES.crearIngresoEgreso(ingresoEgreso)
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
          title: 'Ingreso o Egreso Guardado Exitosamente'
        })
        this.store.dispatch(uiActions.stopLoadin())
      }).catch(err => {

        Swal.hideLoading()
        Swal.fire({
          icon: 'error',
          title: 'A ocurrido un error',
          text: 'Correo o contraseña invalidos'
        })
        this.store.dispatch(uiActions.stopLoadin())

      })


  }

}
